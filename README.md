<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://i.postimg.cc/RZd9RWzB/imagen-2024-01-23-113622114.png" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/badge/React-18.2.0-skyblue
" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/badge/Node-20.10.0-green
" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/badge/NPM-10.2.3-greendark
" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Project Core

The present project is a collaborative web platform where users can create and share their projects.


## Authors 🪬

- [@Joel Tates](https://github.com/ItsgabrielJT)


## Tech Stack 🧩👥

**Client:** React JS, Vite, React Router Dom, Material UI Core, React Testing Library.

**Server:** Node, Express, PostgreSQL. [Code Here.](https://github.com/DannyVinueza/Gestion_Proyectos)


## Modules from project 🧩👥

- Home
- Notificaciones
- Mis proyectos
- Perfil

## Install the project locally ⚠️⚠️⚠️⚠️


Clone the project

```bash
  git clone https://github.com/ItsgabrielJT/project-core-front.git
```

Go to the project directory

```bash
  cd project-core-front
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

> In case an error has occurred with respect to some dependencies run this command ⚠️


```bash
  npm install --legacy-peer-deps
```

## Desploy on vercel 🚀🧩


- Create file **vercel.json** in souce code and input this code.
```json
  {
    "rewrites": [
        { 
            "source": "/(.*)", 
            "destination": "/" 
        }
    ]
}
```
> This code helps to avoid the 404 error when rendering a page for reloading

- Installing the vercel cli

```bash
  npm i -g vercel
```

- we recommend that you leave all the default settings when executing this command

```bash
  vercel
```

- [Link deploy](https://project-core-front.vercel.app)

## License

This project is under the [MIT license](https://opensource.org/licenses/MIT).
