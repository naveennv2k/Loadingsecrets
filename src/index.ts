import { exec } from 'node:child_process';
import * as xmlJs from 'xml-js';
import * as core from '@actions/core';
import * as exec1 from "@actions/exec";
import * as fs from 'fs';

async function action() {
    const cmd  = await exec1.getExecOutput(
        `bash exec.sh`
    );
   
    const cmdOut  = await exec1.getExecOutput(
        `./zv login`
    );
    const cmdOut1 = await exec1.getExecOutput(
        `printf ${process.env['masterPassword']} | ./zv unlock `
    );
   
   
    exec(`./zv search -k ${process.env['passwordName']}`, (err, output) => {
        
         if (err) {
            
             console.error("could not execute command: ", err)
             return
         }
        
         const lines = output.split('\n');
        
         
         for (let i = 2; i < lines.length; i++) {
             
             const columns = lines[i].split('│').map(col => col.trim());
          
             
             if (columns.length < 2 || columns[0].startsWith('─')) {
                 continue;
             }
          
             exec(`./zv get -id ${columns[1]} --output json --not-safe`, (err, output) => {
                 
               
                 const json=JSON.parse(output);
                 
               const secretUsername:string =json.secret.secretData[0].value;
               const secretPassword:string =json.secret.secretData[1].value;
               core.exportVariable("secretUsername", secretUsername);
               core.exportVariable("secretPassword", secretPassword);
               core.setSecret(secretPassword);
             
             }
         );
         }
     
     });
   
   
   
   


}
action();



