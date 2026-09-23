// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testConnection } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import emailRoutes from './src/routes/email.routes.js';
import gameRoutes from './src/routes/game.routes.js';
const app = express();
const PORT = process.env.PORT || 5000;
// Connexion BDD
testConnection();
// Middlewares
const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({ 
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(null, true); // Permissif en dev/proxy
        }
    }, 
    credentials: true 
}));
app.use(express.json());
// Logger (dev)
if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
        next();
    });
}
// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Cars x Battle API', status: 'online' });
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'cars-x-battle-api', timestamp: new Date().toISOString() });
});
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/game', gameRoutes);
// 404
app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));
// Démarrage
app.listen(PORT, () => {
    console.log(`Serveur sur http://localhost:${PORT}`);
});