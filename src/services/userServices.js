export function getToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return null;
    }
    return token;
  }

  export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split(".")[1])).user : null;
  }

  export function logOut() {
    localStorage.removeItem("token");
  }

  export function isAdmin() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user.admin
  }
  
  export function isReceptionist() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user.receptionist
  }

  export function islabTech() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user.labTech
  }

  