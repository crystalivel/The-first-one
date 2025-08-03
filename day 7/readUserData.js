   export async function fetchUserData() {
  try {
    const response = await fetch('https://dummyjson.com/users');
    
    if (!response.ok) {
      throw new Error(`error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

