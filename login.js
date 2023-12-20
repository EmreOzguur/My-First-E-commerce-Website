
let userName = useRef();
let userLastName = useRef();
let userEMail = useRef();
let userPassword = useRef();


function login() {
    const localData = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    let userInfo = {
      userEMail,
      userPassword,
    };
    for (let i of localData) {
      if (i.userEMail === userInfo.userEMail) {
        if (i.userPassword === userInfo.userPassword) {
            ;
          alert("Giriş yaptın!");
          break;
        } else {
          alert("Şifre Yanlış.");
          setIsRegistering(0);
          break;  
        }
      }
    }
  }

  function changePassword() {
    let localData = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    let userInfo = {
      userEMail,
      userPassword,
    };

    for (let i of localData) {
      if (i.userEMail === userInfo.userEMail) {
        i.userPassword = userInfo.userPassword;
        break;
      }
    }
    localStorage.setItem("users", JSON.stringify(localData));
    setIsRegistering(0);
  }

  function register() {
    let userInfo = {
      userName,
      userLastName,
      userEMail,
      userPassword,
    };

    let users = [];
    const localData = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    users.push(...localData);
    users.push(userInfo);
    localStorage.setItem("users", JSON.stringify(users));

    setIsRegistering(0);
  }