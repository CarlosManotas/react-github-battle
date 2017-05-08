var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = `?client_id=${id}&client_secret=${sec}`;

const getProfile = (username) => {
  var urlGithub = `https://api.github.com/users/${username}${params}`
  return axios.get(urlGithub).then(user=>user.data)
}
const getRepos = (username) => {
  var urlGithub = `https://api.github.com/users/${username}/repos${params}&per_page=100`;
  return axios.get(urlGithub)
}
const getStarCount = (repos) => repos.data.reduce((count ,repo)=>count+repo.stargazers_count,0)

const calculateScore = (profile , repos) => {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}
const handleError = (error) => {
  console.warn(error);
  return null;
}
const getUserData = (user) => {
  return axios.all([
    getProfile(user),
    getRepos(user)
  ]).then(data=>{
    var profile = data[0];
    var repos = data[1];
    return {
      profile: profile,
      score: calculateScore(profile,repos)
    }
  });
}
const sortPlayer = (players) => {
  return players.sort((a,b)=>{
    return b.score - a.score;
  })
}
module.exports = {
  battle: (players) => {
    return axios.all(players.map(getUserData))
                .then(sortPlayer)
                .catch(handleError)
  },
  fecthPopularRepos: (lenguaje) => {
    var anotherPeticion = `https://api.github.com/search/repositories?q=stars:>1+language:${lenguaje}&sort=stars&order=desc&type=Repositories`;
    return axios.get(anotherPeticion).then(res =>{return res.data.items});
  },
};
