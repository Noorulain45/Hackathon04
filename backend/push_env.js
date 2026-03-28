const { execSync } = require('child_process');

const envs = {
    JWT_SECRET: "zxcvbnmasdfghjkl",
    MONGO_URI: "mongodb://nooryesheikh45_db_user:rzRjN3exd9sEXNOp@ac-q6mu2dd-shard-00-00.t1oavbs.mongodb.net:27017,ac-q6mu2dd-shard-00-01.t1oavbs.mongodb.net:27017,ac-q6mu2dd-shard-00-02.t1oavbs.mongodb.net:27017/?ssl=true&replicaSet=atlas-xko25h-shard-0&authSource=admin&appName=Cluster0",
    CLOUDINARY_CLOUD_NAME: "dxrwsmkpl",
    CLOUDINARY_API_KEY: "946492664238382",
    CLOUDINARY_API_SECRET: "i3FMH5EWvfIx4-SS9NdWIFdeEe0"
};

for (const [key, value] of Object.entries(envs)) {
    try {
        console.log(`Adding ${key}...`);
        execSync(`vercel env rm ${key} production -y`, { stdio: 'pipe' });
    } catch(e) {}
    try {
        // Node's execSync uses cmd.exe on windows. 
        // We can use process.stdout to write directly to another process or just use file
        const fs = require('fs');
        fs.writeFileSync('temp_env_val.txt', value, 'utf8');
        execSync(`vercel env add ${key} production < temp_env_val.txt`, { stdio: 'inherit' });
    } catch(e) { console.error('Failed to add ' + key) }
}
