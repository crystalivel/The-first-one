import { fetchUserData } from './readUserData.js';

async function getnoMaleUsers () {
    const data = await fetchUserData();
    if (!data || !data.users) return [];
    const nomaleUsers = data.users.filter(user => user.gender === "female");
    return nomaleUsers;
}
  const nameAndAgeList = (users) => {
    const namesAndAges = users.map(user => ({
        name: user.firstName + " " + user.lastName,
        age: user.age
    }));
    return namesAndAges;
}

console.log(nameAndAgeList(await getnoMaleUsers()));

const cheese = ['Steven','alex','james']
[]