
async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`
  let learnersUrl = `http://localhost:3003/api/learners`
  let mentorsUrl = `http://localhost:3003/api/mentors`

  Promise.all([
    axios.get(learnersUrl),
    axios.get(mentorsUrl)
  ])
  .then(res => {
    const learnersInfo = (res[0].data)
    const mentorsInfo = (res[1].data)
    
  
        const mentorIdToName = mentorsInfo.reduce((acc, mentor) => {
          acc[mentor.id] = `${mentor.firstName} ${mentor.lastName}`;
          return acc;
      }, {});
      
      // Replace the mentor IDs in the learners data with their full names
      learnersInfo.forEach(learner => {
          learner.mentors = learner.mentors.map(mentorId => mentorIdToName[mentorId] || `Unknown ID: ${mentorId}`);
      });
      
      // console.log(learnersInfo);
        
      learnersInfo.forEach(card => {
        const profileCard = document.createElement('div');
        const headerName = document.createElement("h3");
        const emailInfo = document.createElement("div");
        const mentorsDets = document.createElement("h4")
        const mentInfo = document.createElement("ul");
        
        
       
        headerName.textContent = card.fullName;
        emailInfo.textContent = card.email;
        mentorsDets.textContent = "Mentors"
        document.querySelector(".info").textContent = "No learner is selected"
        mentorsDets.classList.add('closed')
        profileCard.classList.add("card")

        profileCard.appendChild(headerName)
        profileCard.appendChild(emailInfo)
        profileCard.appendChild(mentorsDets)
        profileCard.appendChild(mentInfo)
      
        document.querySelector(".cards").appendChild(profileCard)

        card.mentors.forEach(idx => {
          const li = document.createElement("li")
          li.textContent = idx
          // console.log(li)
          mentInfo.appendChild(li)
        })

        
        profileCard.addEventListener("click", () => {
          const learners = document.querySelectorAll(".card");
          const isSelected = profileCard.classList.contains('selected');
      
          // Deselect all cards
          learners.forEach(card => card.classList.remove('selected'));
      
          // Toggle the selected class on the clicked card
          if (!isSelected) {
              profileCard.classList.add("selected");
              document.querySelector(".info").textContent = `The selected learner is ${card.fullName}`;
          } else {
              document.querySelector(".info").textContent = "No learner is selected";
          }
      });
      
         
      //   profileCard.addEventListener("click", () => {
      //     const learners = document.querySelectorAll(".card")
      //     learners.forEach(card => card.classList.remove('selected'))
      //     profileCard.classList.toggle("selected");
      //     document.querySelector(".info").textContent = `The selected learner is ${card.fullName}`
      // })


      
        
        
      });
      
      

    }).catch(err => {

    })











  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
