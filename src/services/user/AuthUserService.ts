import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    console.log ("Inicio Serviço");
    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log ("Usuario não existe");
      throw new Error("Email e/ou senha incorretos");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.log ("Senha não confere");
      throw new Error("Email e/ou senha incorretos");
    }
    console.log ("Inicio JWT");
    // Gerar token (JWT) com dados do usuário
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d',
      }
    );
    console.log ("FIm JWT");
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
