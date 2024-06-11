const exec1=require("@actions/exec");
console.log(process.platform);

console.log("test1");
  
const cmd  =  exec1.getExecOutput(
    "./exec.bat"
);