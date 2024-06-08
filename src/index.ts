import { exec } from 'node:child_process';
import * as xmlJs from 'xml-js';
import * as core from '@actions/core';
import * as exec1 from "@actions/exec";
import * as fs from 'fs';

async function action() {
    const cmdOut = await exec1.getExecOutput(
        `./zv login`
    );
    const cmdOut1 = await exec1.getExecOutput(
        `printf "$masterPassword" | ./zv unlock `
    );
   
   
    exec(`./zv search -k $passwordName`, (err, output) => {
        // console.log("in");
         // once the command has completed, the callback function is called
         if (err) {
             // log and return if we encounter an error
             console.error("could not execute command: ", err)
             return
         }
        
         const lines = output.split('\n');
        // console.log(lines);
         
         for (let i = 2; i < lines.length; i++) {
             
             const columns = lines[i].split('│').map(col => col.trim());
            // console.log(columns);
             
             if (columns.length < 2 || columns[0].startsWith('─')) {
                 continue;
             }
           //  console.log(columns[1].substring(7,columns[1].length-10));
             exec(`./zv get -id ${columns[1].substring(7,columns[1].length-10)} --output json --not-safe`, (err, output) => {
                 
                // console.log(output);
                 const json=JSON.parse(output);
                 
               const secretUsername=json.secret.secretData[0].value;
               const secretpassword=json.secret.secretData[1].value;
               
               core.exportVariable("testName",secretUsername);
                 // Log the cleaned output
                 // cleanOutput.forEach(line => console.log(line));
             }
         );
         }
     
     });
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
//     const output = await exec.getExecOutput(
//         './zv search -k "myPassword"'
//     );
//    // console.log(output.stdout);
//     const lines: string[] = output.stdout.split('\n');

//         for (let i = 2; i < lines.length; i++) {
//             const columns: string[] = lines[i].split('│').map(col => col.trim());

//             if (columns.length < 2 || columns[0].startsWith('─')) {
//                 continue;
//             }
//    //         console.log(columns[1]);
//             const output = await exec.getExecOutput(
//                 `./zv get -id 2000015646454 --output json `
//             );
//                            const json = JSON.parse(output.stdout);
//                 const secretUsername = json.secret.secretData[0].value;
//                 const secretPassword = json.secret.secretData[1].value;

//                 // Assuming 'core' is defined and refers to the appropriate module
//                 core.exportVariable("secretUsername", secretUsername);
//                 core.exportVariable("secretPassword", secretPassword);
//                 core.setSecret("secretPassword");

//                 console.log(process.env["secretUsername"]);
//                 console.log(process.env["secretPassword"]);
// }

}
action();












// exec(`./zv login`, (err: Error | null, output: string) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(output);

//     // Call the second function here, inside the callback of the first function
//     exec(`./zv search -k "myPassword"`, (err: Error | null, output: string) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         const lines: string[] = output.split('\n');

//         for (let i = 2; i < lines.length; i++) {
//             const columns: string[] = lines[i].split('│').map(col => col.trim());

//             if (columns.length < 2 || columns[0].startsWith('─')) {
//                 continue;
//             }

//             exec(`./zv get -id ${columns[1].substring(7, columns[1].length - 10)} --output json --not-safe`, (err, output) => {
//                 if (err) {
//                     console.error(err);
//                     return;
//                 }
//                 const json = JSON.parse(output);
//                 const secretUsername = json.secret.secretData[0].value;
//                 const secretPassword = json.secret.secretData[1].value;

//                 // Assuming 'core' is defined and refers to the appropriate module
//                 core.exportVariable("secretUsername", secretUsername);
//                 core.exportVariable("secretPassword", secretPassword);
//                 core.setSecret("secretPassword");

//                 console.log(process.env["secretUsername"]);
//                 console.log(process.env["secretPassword"]);
               
//         //   echo "password=$secretPassword" >> $GITHUB_OUTPUT
//         //       exec(' echo "username=$secretUsername" >> $GITHUB_OUTPUT',(error,output)=>{});
              
              
//             });
//         }
//     });
// });
