# OpenClaw Oh My Soul

[![npm version](https://img.shields.io/npm/v/openclaw-oh-my-soul.svg)](https://www.npmjs.com/package/openclaw-oh-my-soul)
[![GitHub](https://img.shields.io/badge/GitHub-openclaw--soul--generator--cli-black?logo=github)](https://github.com/kylinzhao/openclaw-soul-generator-cli)

[English](./README.md) | [简体中文](./README.zh-CN.md) | [Español](./README.es.md) | [Français](./README.fr.md) | [日本語](./README.ja.md)

Una CLI offline que te ayuda a cocinar un persona pack de OpenClaw con energia de langosta alegre y ligeramente sospechosa.

## Para Que Sirve

A veces solo quieres una buena persona de OpenClaw sin pasar la tarde hablando con cuatro archivos markdown como si fueras un mago costero en crisis.

`openclaw-oh-my-soul` hace unas preguntas claras, mira un poco tu repositorio y luego te entrega:

- `SOUL.md`
- `AGENTS.md`
- `TOOLS.md`
- `persona.json`

La CLI puede ser juguetona. El resultado sigue siendo serio donde importa.

## Inicio Rapido

Genera el pack en el directorio actual:

```bash
npx openclaw-oh-my-soul
```

Apunta a otro workspace:

```bash
npx openclaw-oh-my-soul --cwd /path/to/workspace
```

Elige el idioma inicial:

```bash
npx openclaw-oh-my-soul --locale es
```

Mira la ayuda y saluda a la langosta:

```bash
npx openclaw-oh-my-soul --help
```

## Lo Que Hace Esta Langosta

- usa preguntas guiadas en lugar de pedir un muro de texto
- permite varios roles principales en `use case`
- inspecciona el repo de forma ligera para sacar señales del proyecto
- genera todo en local, sin llamadas a modelos
- detecta archivos persona existentes y pregunta como tratar el caparazon antiguo
- localiza tanto la CLI como los archivos generados
- puede aplicar `SOUL.md`, `AGENTS.md` y `TOOLS.md` al workspace de OpenClaw detectado
- crea una copia de seguridad antes de cada aplicacion y puede restaurarla despues

## Idiomas Soportados

- English (`en`)
- 中文 (`zh`)
- Español (`es`)
- Français (`fr`)
- 日本語 (`ja`)

La primera pregunta del asistente es el idioma de la CLI, y esa decision tambien controla el idioma del pack generado.

## Por Que Tiene Algo De Humor

Porque una herramienta no tiene por que sonar como si la hubiera redactado un formulario gris con problemas de autoestima.

La idea es combinar:

- comandos claros
- lectura rapida
- salida util
- suficiente tonteria de langosta para que el terminal tenga pulso

## Desarrollo

Instala dependencias:

```bash
npm install
```

Ejecuta las comprobaciones:

```bash
npm run lint
npm test
npm run build
```

## Enlaces

- GitHub: [kylinzhao/openclaw-soul-generator-cli](https://github.com/kylinzhao/openclaw-soul-generator-cli)
- npm: [openclaw-oh-my-soul](https://www.npmjs.com/package/openclaw-oh-my-soul)
