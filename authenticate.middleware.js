// Middleware para autenticar la sesión del usuario.
export const authenticate = (req, res, next) => {
  console.log("Cookies recibidas:", req.cookies); // Para verificar si la cookie llega al backend

  const token = req.cookies?.access_token; // Asegurarse de que cookies exista

  if (!token) {
    console.log("2 - No se encontró token en la cookie");
    return res.status(401).json({ message: "No existe token: No autorizado" });
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET_JWT);
    console.log("3 - Token verificado correctamente:", req.user);
    next();
  } catch (error) {
    console.error("4 - Error al verificar token:", error.message);
    return res.status(403).json({ message: "Token inválido" });
  }
};



// Middleware para autorizar roles de usuario.
export const authorizedRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) return res.status(403).json({ message: "No autorizado" });
    next();
  };
};
