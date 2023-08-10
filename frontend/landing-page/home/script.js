const brandTexts = [
    {
      title: 'Bezyl Mophat',
      description: 'Tech Writer | Backend Engineer | Code Craftsman by Day, Wordsmith by Night - Meet Bezyl Mophat!'

    },

    {
        title: 'Cyril Muchiri ',
        description: 'Java Enterprise Developer . Java in His Veins, Innovation in His Mind - Cyril Muchiri'
  
      },

      {
        title: 'Anthony Kigotho',
        description: 'Python Developer | Pythonic Wizardry. Anthony\'s Code Spells Innovation'
  
      },

      {
        title: 'We are Mocanto ',
        description: 'Crafting Success Stories , One Project at a Time'
  
      },


 
    // Add more text variations here
  ];
  
  let currentTextIndex = 0;
  const brandTitle = document.querySelector('.brandInfo h1');
  const brandDescription = document.querySelector('.brandInfo p');
  
  function changeBrandText() {
    const newText = brandTexts[currentTextIndex];
    brandTitle.textContent = newText.title;
    brandDescription.textContent = newText.description;
    currentTextIndex = (currentTextIndex + 1) % brandTexts.length;
  }
  

  setTimeout(()=>{

  setInterval(changeBrandText, 5000)// Change text every 5 seconds


  },3000)
  
  const login = document.querySelector('#login');
  const register = document.querySelector('#register');
 
  login.addEventListener('click',()=>{
    window.location.href = '../../authentication/login/login.html'
  })

  register.addEventListener('click',()=>{
    window.location.href = '../../authentication/register/register.html'
  })