const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));

function renderLogs(res) {
    const logFilePath = path.join(__dirname, 'logs', 'error.log');

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File does not exist
                return res.status(404).send(`
                    <html>
                        <head>
                            <title>File Not Found</title>
                            <style>
                                body {
                                    font-family: 'Fira Code', monospace;
                                    background: linear-gradient(-45deg, #0a0a0aff, #070707ff, #030303ff, #030303ff);
                                    background-size: 400% 400%;
                                    // animation: gradientFlow 20s ease infinite;
                                    margin: 0;
                                    padding: 0;
                                    color: #333;
                                    min-height: 100vh;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    text-align: center;
                                }
                                @keyframes gradientFlow {
                                    0% { background-position: 0% 50%; }
                                    25% { background-position: 50% 100%; }
                                    50% { background-position: 100% 50%; }
                                    75% { background-position: 50% 0%; }
                                    100% { background-position: 0% 50%; }
                                }
                                h1 {
                                    font-size: 2.8rem;
                                    background: linear-gradient(90deg, #020202ff, #0a0a0aff);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    text-shadow: 0 0 15px rgba(255, 182, 193, 0.4);
                                    animation: glowPulse 2s infinite;
                                }
                                p {
                                    font-size: 1.4rem;
                                    color: #444;
                                }
                                @keyframes glowPulse {
                                    0%, 100% { text-shadow: 0 0 15px rgba(3, 3, 3, 0.4); }
                                    50% { text-shadow: 0 0 25px rgba(5, 5, 5, 0.8); }
                                }
                            </style>
                        </head>
                        <body>
                            <h1>📄 File Not Found</h1>
                            <p>The log file <strong>error.log</strong> does not exist in the <code>logs</code> folder.</p>
                        </body>
                    </html>
                `);
            }

            console.error('Error reading log file:', err.message);
            return res.status(500).send(`
                <h1>Error Loading Logs</h1>
                <p>Could not read log file. Please check permissions or file path.</p>
            `);
        }

        const content = data.trim() === '' ? 'No Error Content' : data;

        res.send(`
            <html>
                <head>
                    <title>Error Logs</title>
                    <style>
                        body {
                            font-family: 'Fira Code', monospace;
                            background: linear-gradient(-45deg, #050505ff, #030303ff, #050505ff, #070707ff);
                            background-size: 400% 400%;
                            // animation: gradientFlow 20s ease infinite;
                            margin: 0;
                            padding: 0;
                            color: #333;
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                        
                        @keyframes gradientFlow {
                            0% { background-position: 0% 50%; }
                            25% { background-position: 50% 100%; }
                            50% { background-position: 100% 50%; }
                            75% { background-position: 50% 0%; }
                            100% { background-position: 0% 50%; }
                        }

                        h1 {
                            font-size: 2.8rem;
                            background: linear-gradient(90deg, #4d0aebff, #1f07fdff);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            margin-top: 30px;
                            margin-bottom: 20px;
                            text-shadow: 0 0 15px rgba(92, 8, 248, 0.4);
                            // animation: glowPulse 2s infinite;
                        }

                        @keyframes glowPulse {
                            0%, 100% { text-shadow: 0 0 15px rgba(255, 182, 193, 0.4); }
                            50% { text-shadow: 0 0 25px rgba(255, 182, 193, 0.8); }
                        }

                        pre {
                            white-space: pre-wrap;
                            word-wrap: break-word;
                            background: rgba(255, 255, 255, 0.85);
                            color: #222;
                            padding: 25px;
                            border-radius: 12px;
                            max-width: 90%;
                            max-height: 70vh;
                            overflow-y: auto;
                            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1), 
                                        0 0 15px rgba(255, 182, 193, 0.2);
                            border: 1px solid rgba(255, 182, 193, 0.2);
                            font-size: 1.3rem;
                            line-height: 1.6;
                        }

                        pre:hover {
                            transform: scale(1.02);
                            box-shadow: 0 4px 40px rgba(0, 0, 0, 0.15), 
                                        0 0 25px rgba(255, 182, 193, 0.4);
                        }

                        pre::-webkit-scrollbar {
                            width: 10px;
                        }
                        pre::-webkit-scrollbar-track {
                            background: rgba(0, 0, 0, 0.05);
                            border-radius: 10px;
                        }
                        pre::-webkit-scrollbar-thumb {
                            background: linear-gradient(#fbc2eb, #a6c1ee);
                            border-radius: 10px;
                        }
                    </style>
                </head>
                <body>
                    <h1>📜 Error Logs</h1>
                    <pre>${content}</pre>
                </body>
            </html>
        `);
    });
}

app.get('/', (req, res) => {
    renderLogs(res);
});

app.get('/logs', (req, res) => {
    renderLogs(res);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});