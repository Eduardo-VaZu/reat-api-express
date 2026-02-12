# 📘 Prisma CLI - Comandos Importantes

## 🚀 Inicialización

### Inicializar Prisma en el proyecto

``` bash
npx prisma init
```

------------------------------------------------------------------------

## 📦 Instalación

``` bash
npm install prisma --save-dev
npm install @prisma/client
```

------------------------------------------------------------------------

## 🗄 Migraciones

### Crear migración en desarrollo

``` bash
npx prisma migrate dev --name nombre_migracion
```

### Aplicar migraciones en producción

``` bash
npx prisma migrate deploy
```

### Resetear base de datos (desarrollo)

``` bash
npx prisma migrate reset
```

### Crear migración sin aplicar

``` bash
npx prisma migrate dev --create-only
```

------------------------------------------------------------------------

## 🔄 Generación

### Regenerar cliente Prisma

``` bash
npx prisma generate
```

------------------------------------------------------------------------

## 🔍 Base de Datos

### Ver base de datos (UI visual)

``` bash
npx prisma studio
```

### Sincronizar schema con base de datos (sin migraciones)

``` bash
npx prisma db push
```

### Leer estructura de base existente

``` bash
npx prisma db pull
```

### Verificar estado de migraciones

``` bash
npx prisma migrate status
```

------------------------------------------------------------------------

## 🌱 Seed (Datos Iniciales)

### Ejecutar seed

``` bash
npx prisma db seed
```

------------------------------------------------------------------------

## 🔎 Validación

### Validar schema.prisma

``` bash
npx prisma validate
```

### Formatear schema.prisma

``` bash
npx prisma format
```

------------------------------------------------------------------------

## 🧪 Debug

### Ver logs detallados

``` bash
DEBUG="*" npx prisma generate
```

------------------------------------------------------------------------

# 🧠 Flujo Recomendado en Desarrollo

1.  Modificar `schema.prisma`

2.  Ejecutar:

    ``` bash
    npx prisma migrate dev --name cambio
    ```

3.  Usar el nuevo modelo en el backend

------------------------------------------------------------------------

# 🎯 Comandos Más Usados

``` bash
npx prisma init
npx prisma migrate dev --name nombre
npx prisma generate
npx prisma studio
npx prisma db push
```
