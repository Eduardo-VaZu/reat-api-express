# 🧪 Testing en Express con Jest + Supertest (TypeScript)

## 📦 1️⃣ Instalar dependencias

``` bash
npm install -D jest ts-jest @types/jest supertest @types/supertest
```

------------------------------------------------------------------------

## ⚙️ 2️⃣ Inicializar configuración de Jest para TypeScript

``` bash
npx ts-jest config:init
```

Esto generará:

    jest.config.js

------------------------------------------------------------------------

## 📝 3️⃣ Agregar script en package.json

``` json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

------------------------------------------------------------------------

## ▶️ 4️⃣ Ejecutar tests

Ejecutar todos los tests:

``` bash
npm run test
```

Modo watch:

``` bash
npm run test:watch
```

Ver cobertura de código:

``` bash
npm run test:coverage
```

------------------------------------------------------------------------

## 🗂️ Estructura recomendada

    src/
      app.ts
      server.ts
    tests/
      health.test.ts
    jest.config.js
