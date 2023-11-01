console.log('person1 shows ticket');
console.log('person2 shows ticket');

const preMovie = async () => {

  const person3PromiseToShowTicketWhenWifeArrives = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ticket'), 3000);
  });
  const getPopcorn =  new Promise((resolve, reject) => {
		setTimeout(() => resolve('popcorn'), 3000);
  });
  
  const getCandy =  new Promise((resolve, reject) => {
		setTimeout(() => resolve('candy'), 3000);
  });
  
   const getCoke =  new Promise((resolve, reject) => {
		setTimeout(() => resolve('coke'), 3000);
  });
  const getColdDrinks = new Promise((resolve, reject) => {
  	setTimeout(() => resolve('coldDrinks'), 3000);
  })

  let ticket = await person3PromiseToShowTicketWhenWifeArrives;
  
    let [ popcorn, candy, coke, coldDrinks ] =
    await Promise.all([ getPopcorn, getCandy, getCoke, getColdDrinks ]);

    console.log(`got ${popcorn}, ${candy}, ${coke} ${coldDrinks}`);

  
  return ticket;
  
};

preMovie().then((t) => console.log(`person4 shows ${t}`));

console.log('person4 shows ticket');