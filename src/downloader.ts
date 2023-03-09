import youtubedl from 'youtube-dl-exec';
import path from 'path';
import fs from 'fs';

export const download = (url: string, output?: string)=>{
    const willDownload = new Promise<void>((resolve, reject)=>{
        try {
            /**
             * We'll use the child process returned by youtubedl.exec
             * and pipe the output directly to the output stream
             */
            const child = youtubedl.exec(url, {
                dumpSingleJson: true,
            });
  
            /**
             * We use this buffer to store the information of the video
             */
            const videoInfoBuffer: Buffer[] = [];
            child.stdout?.on('data', (chunk) => {
                // console.log(chunk.toString())
                videoInfoBuffer.push(chunk);
            });
  
            /**
             * Once exited, notify the user where the file was saved
             * If there's an error, notify the user also
             */
            child.on('exit', (code) => {
                if (code !== 0) {
                    console.error('Failed to download video');
                    return;
                }

                /**
                 * Get the default title of the video if not output flag provided 
                 */
                const videoInfoString = Buffer.concat(videoInfoBuffer).toString('utf-8');
                const videoInfo = JSON.parse(videoInfoString);
                const videoTitle = videoInfo.fulltitle.replace(/[^\w\s]/gi, '');
                const outputFilePath = path.resolve(__dirname, output || `${videoTitle}.mp4`);
                const outputStream = fs.createWriteStream(outputFilePath);
    
                // Write the video to file
                child.stdout?.pipe(outputStream);
    
                // Notify user once done
                outputStream.on('finish', () => {
                    console.log(`Video downloaded and saved to ${outputFilePath}`);
                    outputStream.end();
                    resolve();
                });
            });
        } catch (error) {
            reject(error);
        }
    })

    return willDownload;
}

export const downloadAgain = (url: string)=>{
    const willDownload = new Promise((resolve, reject)=>{
        try {
            let outputFilePath = 'test.mp4';
            const outputStream = fs.createWriteStream(outputFilePath);

            const child = youtubedl.exec(url, { dumpSingleJson: true });
            child.stdout?.pipe(outputStream);

            child.on('exit', (code) => {
                if (code === 0) {
                    console.log(`Video downloaded and saved to ${outputFilePath}`);
                    resolve(`Video downloaded and saved to ${outputFilePath}`)
                } else {
                    console.error('Failed to download video');
                    resolve('Failed to download video')
                }
            });
        } catch (error) {
            reject(error)
        }
    })

    return willDownload
}