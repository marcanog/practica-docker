import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function GuiaInstructor() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Guía del Instructor: Práctica Grupal de Docker</h1>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Esta guía está diseñada para ayudar al instructor a facilitar la práctica grupal de Docker. Contiene consejos,
          soluciones y puntos clave para cada ejercicio.
        </AlertDescription>
      </Alert>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Preparación</h2>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Asegúrate de que todos los participantes tengan Docker instalado (Docker Desktop para Windows/Mac,
                  Docker Engine para Linux)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Distribuye los archivos de ejemplo antes de la sesión</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Organiza a los participantes en grupos de 3-4 personas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Prepara un repositorio Git donde los grupos puedan subir sus soluciones</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="basic" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Ejercicios Básicos</TabsTrigger>
          <TabsTrigger value="intermediate">Ejercicios Intermedios</TabsTrigger>
          <TabsTrigger value="advanced">Ejercicios Avanzados</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="space-y-6">
            <ExerciseGuide
              title="Creación de Imágenes"
              timeRequired="45 minutos"
              keyPoints={[
                "Enfatiza la importancia de imágenes base ligeras (alpine vs full)",
                "Explica las capas de Docker y cómo optimizarlas",
                "Demuestra el uso de .dockerignore",
                "Discute las mejores prácticas de seguridad",
              ]}
              commonIssues={[
                "Olvidar exponer puertos necesarios",
                "Copiar node_modules en lugar de usar .dockerignore",
                "No entender el contexto de construcción",
              ]}
              solution={`
# Solución óptima para el Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

USER node

EXPOSE 3000

CMD ["node", "index.js"]
              `}
            />

            <ExerciseGuide
              title="Gestión de Contenedores"
              timeRequired="30 minutos"
              keyPoints={[
                "Explica la diferencia entre -d (detached) y modo interactivo",
                "Demuestra cómo inspeccionar contenedores en ejecución",
                "Enseña a limpiar recursos no utilizados",
                "Explica las limitaciones de recursos (--memory, --cpu)",
              ]}
              commonIssues={[
                "Confusión entre parar (stop) y eliminar (rm) contenedores",
                "No entender el mapeo de puertos",
                "Olvidar nombrar los contenedores para fácil referencia",
              ]}
              solution={`
# Comandos clave para este ejercicio
docker run -d --name myapp -p 3000:3000 myapp:latest
docker ps -a
docker logs myapp
docker exec -it myapp sh
docker stop myapp
docker rm myapp
docker system prune -a
              `}
            />
          </div>
        </TabsContent>

        <TabsContent value="intermediate">
          <div className="space-y-6">
            <ExerciseGuide
              title="Docker Compose"
              timeRequired="60 minutos"
              keyPoints={[
                "Explica la estructura del archivo docker-compose.yml",
                "Demuestra cómo gestionar dependencias entre servicios",
                "Enseña a usar variables de entorno con .env",
                "Explica los diferentes comandos de docker-compose",
              ]}
              commonIssues={[
                "Problemas con la indentación en YAML",
                "Confusión con las versiones de la sintaxis de Compose",
                "No entender el orden de inicio de los servicios",
              ]}
              solution={`
# Comando para ejecutar la aplicación
docker-compose up -d

# Comando para escalar un servicio
docker-compose up -d --scale webapp=3

# Comando para ver logs
docker-compose logs -f webapp

# Comando para detener todos los servicios
docker-compose down
              `}
            />

            <ExerciseGuide
              title="Redes en Docker"
              timeRequired="45 minutos"
              keyPoints={[
                "Explica los diferentes tipos de redes (bridge, host, overlay)",
                "Demuestra cómo los contenedores se comunican por nombre",
                "Enseña a crear redes personalizadas",
                "Explica las consideraciones de seguridad en redes",
              ]}
              commonIssues={[
                "No entender que los contenedores en la misma red pueden comunicarse por nombre",
                "Confusión con el mapeo de puertos vs exposición de puertos",
                "Problemas con la resolución DNS entre contenedores",
              ]}
              solution={`
# Crear una red personalizada
docker network create my-network

# Conectar contenedores existentes a la red
docker network connect my-network container1
docker network connect my-network container2

# Inspeccionar la red
docker network inspect my-network

# Ejecutar un contenedor en una red específica
docker run --network=my-network --name db postgres:14
              `}
            />
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="space-y-6">
            <ExerciseGuide
              title="Volúmenes y Persistencia"
              timeRequired="60 minutos"
              keyPoints={[
                "Explica los diferentes tipos de volúmenes (named volumes, bind mounts, tmpfs)",
                "Demuestra estrategias de backup y restauración",
                "Enseña a compartir datos entre contenedores",
                "Explica las consideraciones de rendimiento",
              ]}
              commonIssues={[
                "Confusión entre bind mounts y named volumes",
                "Problemas de permisos en volúmenes",
                "No entender la persistencia de datos después de eliminar contenedores",
              ]}
              solution={`
# Crear un volumen nombrado
docker volume create my-data

# Ejecutar un contenedor con un volumen
docker run -v my-data:/data postgres:14

# Backup de datos de un volumen
docker run --rm -v my-data:/source -v $(pwd):/backup alpine tar -czvf /backup/data.tar.gz -C /source .

# Restaurar datos a un volumen
docker run --rm -v my-data:/target -v $(pwd):/backup alpine sh -c "tar -xzvf /backup/data.tar.gz -C /target"
              `}
            />

            <ExerciseGuide
              title="CI/CD con Docker"
              timeRequired="90 minutos"
              keyPoints={[
                "Explica cómo integrar Docker en pipelines de CI/CD",
                "Demuestra estrategias de construcción multi-etapa",
                "Enseña a optimizar imágenes para producción",
                "Explica las consideraciones de seguridad en CI/CD",
              ]}
              commonIssues={[
                "Imágenes demasiado grandes para producción",
                "Problemas de seguridad al almacenar credenciales",
                "No entender el concepto de construcción multi-etapa",
              ]}
              solution={`
# Ejemplo de Dockerfile multi-etapa
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
USER node
CMD ["node", "dist/index.js"]
              `}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Evaluación</h2>
        <Card>
          <CardHeader>
            <CardTitle>Criterios de Evaluación</CardTitle>
            <CardDescription>Utiliza estos criterios para evaluar el trabajo de los grupos</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-medium">Funcionalidad (40%):</span>
                <span>¿Las soluciones funcionan correctamente según los requisitos?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">Optimización (30%):</span>
                <span>¿Las imágenes y configuraciones están optimizadas (tamaño, seguridad, rendimiento)?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">Documentación (15%):</span>
                <span>¿El código está bien documentado y es fácil de entender?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">Colaboración (15%):</span>
                <span>¿El grupo trabajó de manera efectiva y todos contribuyeron?</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ExerciseGuide({ title, timeRequired, keyPoints, commonIssues, solution }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeRequired}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Puntos Clave a Enfatizar:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Problemas Comunes:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {commonIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Solución de Referencia:</h4>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            <code>{solution}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}

