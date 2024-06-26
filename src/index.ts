import { ChildProcess, exec } from 'node:child_process';
import * as xmlJs from 'xml-js';
import * as core from '@actions/core';
import * as executor from "@actions/exec";
import * as fs from 'fs';

var flag:boolean =fs.existsSync(`${process.env['HOME']}/ZohoVaultCLI/credentials.json`);

async function action1() {
  
   if(flag==false){
   
  

   
    const cmdOut :executor.ExecOutput = await executor.getExecOutput(
        ` ${process.env['GITHUB_ACTION_PATH']}/exec.sh`
    );
    
}  
    const cmdOut1:ChildProcess = await exec(`${process.env['GITHUB_WORKSPACE']}/zv unlock ${process.env['masterPassword']}`, (err, output) => {
       
      
   
   
    exec(`${process.env['GITHUB_WORKSPACE']}/zv search -k "${process.env['passwordName']}" --name --tags -V --output json`, (err, output) => {
        
         if (err) {
            
             console.error("could not execute command: ", err)
             return
         }
        


         var json =JSON.parse(output);


         for( let iterator=0;iterator<json.length;iterator++){
            var currentObject=json[iterator];
            if(currentObject.secretname==`${process.env['passwordName']}`){
                exec(`${process.env['GITHUB_WORKSPACE']}/zv get -id ${currentObject.secretid} --output json --not-safe`, (err, output) => {
                    if (err) {
                
                        console.error("could not execute command: ", err)
                        return
                    }
                   
                     const json=JSON.parse(output);
                     
                   const secretUsername:string =json.secret.secretData[0].value;
                   const secretPassword:string =json.secret.secretData[1].value;
                   core.exportVariable(`${process.env['passwordName']}_username`, secretUsername);
                   core.exportVariable(`${process.env['passwordName']}_password`, secretPassword);
                   core.setSecret(secretPassword);
                   core.setSecret(secretUsername);
                 
                 }
             );
            }
         }
        //  console.log(json[0].secretname);
     

        //  const lines:string[] = output;
        
         
        //  for (let i = 2; i < lines.length; i++) {
             
        //      const columns:string[] = lines[i].split('│').map(col => col.trim());
          
             
        //      if (columns.length < 2 || columns[0].startsWith('─')) {
        //          continue;
        //      }
        //      columns[2]=columns[2].trim();
        //      console.log(columns[2]);
        //     console.log(`${process.env['passwordName']}`);
        //      console.log(columns[2]==`${process.env['passwordName']}`);
            
        //      if(columns[2]==`${process.env['passwordName']}`){
        //      exec(`${process.env['GITHUB_WORKSPACE']}/zv get -id ${columns[1]} --output json --not-safe`, (err, output) => {
        //         if (err) {
            
        //             console.error("could not execute command: ", err)
        //             return
        //         }
               
        //          const json=JSON.parse(output);
                 
        //        const secretUsername:string =json.secret.secretData[0].value;
        //        const secretPassword:string =json.secret.secretData[1].value;
        //        core.exportVariable(`${process.env['passwordName']}_username`, secretUsername);
        //        core.exportVariable(`${process.env['passwordName']}_password`, secretPassword);
        //        core.setSecret(secretPassword);
             
        //      }
        //  );
        //  }
        //  else{
        //     console.log("no secrets found ");
        //  }
        // }
     });
    });
   
   
   
   

}

async function action2() {
    console.log(process.platform);
  
        const cmd  = await executor.getExecOutput(
            "node ./installCli.js"
        );
     
    
            const cmdOut1 = exec(`zv unlock ${process.env['masterPassword']}`, (err, output) => {
                if(err){
                    console.log(err);
                    return ;
                }
                console.log(output);

                exec(`zv search -k "${process.env['passwordName']}"`, (err, output) => {
        
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
