// Función para generar un password aleatorio

const generateRandomPassword = (length: number) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

// Lista para almacenar los passwords generados
const generatedPasswords = new Set();

// Función para generar un password único
export function generateUniquePassword(length: number) {
  let password = generateRandomPassword(length);
  while (generatedPasswords.has(password)) {
    password = generateRandomPassword(length);
  }
  generatedPasswords.add(password);
  return password;
}
