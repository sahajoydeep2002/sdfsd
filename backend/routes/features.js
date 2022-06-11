const express = require('express');
const router = express.Router();
const { spawn } = require("child_process");
const { PythonShell } = require("python-shell");
const Sentiment = require('sentiment');
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, {
    region: 'us1',
    edge: 'ashburn',
});

const sentiment = new Sentiment();

router.get('/diet-generator', function (req, res) {
    let { weight, height, age, gender, phys_act } = req.query;

    let options = {
        mode: "json",
        pythonPath: "python",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "../python",
        args: [weight, height, age, gender, phys_act],
    };

    PythonShell.run('diet_generator.py', options, function (err, results) {
        if (err) throw err;

        res.send(results[0]);
    });
});

router.get('/diet-reminders', (req, res) => {
    client.messages
        .create({
            body: "Hi there", // TODO: FILL WITH REQ
            from: "+12346574087",
            to: "+13015757997", // TODO: FILL IN WITH REQ
        })
        .then((message) => console.log(message.sid));
});

router.get('/chatbot', async (req, res) => {
    const { message } = req.query;

    const positive_messages = [
        'Optimism is a happiness magnet. If you stay positive good things and good people will be drawn to you.',
        'Keep your face to the sunshine and you cannot see a shadow.',
        "You're braver than you believe, and stronger than you seem, and smarter than you think.",
        'Happiness is the only thing that multiplies when you share it.',
        'The only time you fail is when you fall down and stay down.',
        "It's not whether you get knocked down, it's whether you get up.",
    ];

    const conditions = {
        'Clinical depression':
            'a mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.',
        'Anxiety disorder':
            "a mental health disorder characterized by feelings of worry, anxiety, or fear that are strong enough to interfere with one's daily activities",
        'Bipolar disorder':
            'a disorder associated with episodes of mood swings ranging from depressive lows to manic highs.',
        Dementia:
            'a group of thinking and social symptoms that interferes with daily functioning.',
        'Attention-deficit/hyperactivity disorder':
            'a chronic condition including attention difficulty, hyperactivity, and impulsiveness.',
        Schizophrenia:
            "a disorder that affects a person's ability to think, feel, and behave clearly.",
        'Obsessive compulsive disorder':
            'Excessive thoughts (obsessions) that lead to repetitive behaviors (compulsions).',
        Autism: 'a serious developmental disorder that impairs the ability to communicate and interact.',
        'Post traumatic stress disorder (PTSD)':
            'a disorder in which a person has difficulty recovering after experiencing or witnessing a terrifying event.',
    };

    const condition_names = Object.keys(conditions);
    const keywords = condition_names
        .join(' ')
        .replace(/disorder/g, '')
        .split(' ')
        .filter((n) => n != '');

    for (let i = 0; i < keywords.length; i++) {
        const keyword = keywords[i].toLowerCase();
        if (message.toLowerCase().includes(keyword)) {
            for (let condition of Object.keys(conditions)) {
                if (condition.toLowerCase().includes(keyword)) {
                    return res.json({
                        condition,
                        message: `${condition} is ${conditions[condition]}`,
                    });
                }
            }
        }
    }

    const result = sentiment.analyze(message);

    // If negative and not a key word
    if (result.score < 0) {
        res.json({
            message:
                positive_messages[
                    Math.floor(Math.random() * positive_messages.length)
                ],
        });
    } else {
        res.json({
            message:
                'Ask me about any of the following mental health conditions: ' +
                condition_names.join(', '),
        });
    }
});

module.exports = router;
