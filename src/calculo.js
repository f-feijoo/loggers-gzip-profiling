console.log("Child Process created", process.pid);

const calculo = (cant) => {
  let obj = {};
  for (let i = 0; i < cant; i++) {
    let num = Math.floor(Math.random() * 1000);
    if (obj[num]) {
      obj[num] = obj[num] + 1;
    } else {
      obj[num] = 1;
    }
  }
  return obj
};

process.on('message',(cant)=>{
  console.log("Child Process received message", cant);
    process.send(calculo(cant))
    setTimeout(() => {
      process.exit();
    }, 5000);
})
