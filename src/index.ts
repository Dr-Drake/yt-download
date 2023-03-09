#!/usr/bin/env node

import yargs from 'yargs';
import youtubedl from 'youtube-dl-exec';
import logger from 'progress-estimator'

yargs
  .scriptName('yt-dl')
  .usage('$0 <cmd> [args]')
  .command(
    'download <url>',
    'Download a YouTube video',
    (yargs) => {
      yargs.positional('url', {
        describe: 'The URL of the YouTube video to download',
        type: 'string',
      });
      yargs.option('output', {
        alias: 'o',
        describe: 'The path to the output file',
        type: 'string',
        // demandOption: true,
      });
    },
    async (argv) => {
      try {

        const promise = youtubedl(argv.url as string, {
          format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
          output: argv.output as string
        });

        const result = await logger()(promise, `Obtaining ${argv.url as string}`);
        console.log(result);
        
      } catch (error) {
        console.error('Failed to download video', error);
      }
    }
  )
  .demandCommand(1, 'You must specify a command')
  .help().argv;

