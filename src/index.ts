import { exec } from 'node:child_process';
import * as xmlJs from 'xml-js';
import * as core from '@actions/core';
import * as exec1 from "@actions/exec";
import * as fs from 'fs';

var flag:boolean =fs.existsSync('configuration.txt');

async function action1() {
   if(flag==false){
   
    console.log(process.env);
    
    // const cmd  = await exec1.getExecOutput(
    //     `bash exec.sh`
    // );
   
    const cmdOut  = await exec1.getExecOutput(
        `sh ${process.env['$GITHUB_ACTION_PATH']}/exec.sh`
    );
    
}  
    const cmdOut1 = await exec(`${process.env['GITHUB_WORKSPACE']}/zv unlock ${process.env['masterPassword']}`, (err, output) => {
        console.log(output);
    
      
   
   
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
          
             exec(`$GITHUB_WORKSPACE/zv./zv get -id ${columns[1]} --output json --not-safe`, (err, output) => {
                 
               
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
    });
   
   
   
   

}

async function action2() {
    console.log(process.platform);
  
        const cmd  = await exec1.getExecOutput(
            "node ./installCli.js"
        );
     
    
            const cmdOut1 = exec(`zv unlock ${process.env['masterPassword']}`, (err, output) => {
                if(err){
                    console.log(err);
                    return ;
                }
                console.log(output);

                exec(`zv search -k ${process.env['passwordName']}`, (err, output) => {
        
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
                     
                        exec(`zv get -id ${columns[1]} --output json --not-safe`, (err, output) => {
                            
                          
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
               
    //     // });});
    });
    
}





if(process.platform =='darwin' || process.platform=='linux'){
    action1();
}
if(process.platform == 'win32'){
    action2();
}
