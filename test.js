import { ChildProcess, exec } from 'node:child_process';





exec('./zv search -k "OpenAi Api Key 2" --name --tags -V --output json',(err,output)=>{
    if(err){
        console.log(err);
        return ;
    }
    var json =JSON.parse(output);
    console.log(json[0].secretname);

});




