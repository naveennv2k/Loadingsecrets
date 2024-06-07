import { exec } from 'node:child_process';
import * as xmlJs from 'xml-js';
import * as core from '@actions/core';
import * as fs from 'fs';

exec(`./zv search -k "myPassword"`, (err: Error | null, output: string) => {
  
    const lines: string[] = output.split('\n');

for (let i = 2; i < lines.length; i++) {
    const columns: string[] = lines[i].split('│').map(col => col.trim());
    
    if (columns.length < 2 || columns[0].startsWith('─')) {
        continue;
    }
    
    exec(`./zv get -id ${columns[1].substring(7, columns[1].length - 10)} --output json --not-safe`, (err, output) => {
        const json = JSON.parse(output);
        const secretUsername = json.secret.secretData[0].value;
        const secretPassword = json.secret.secretData[1].value;

        core.exportVariable("secretUsername", secretUsername);
        core.exportVariable("secretPassword", secretPassword);
        core.setSecret("secretPassword");

        console.log(process.env["secretUsername"]);
        console.log(process.env["secretPassword"]);
    });
}
     

}
   
);