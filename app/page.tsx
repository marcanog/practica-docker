import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Server, Database, Network, HardDrive, GitBranch } from "lucide-react"

export default function DockerPractice() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Práctica Grupal de Docker</h1>
      <p className="text-lg text-muted-foreground mb-10 text-center max-w-3xl mx-auto">
        Una serie de ejercicios prácticos para aprender Docker en equipo, desde conceptos básicos hasta configuraciones
        avanzadas.
      </p>

      <Tabs defaultValue="basic" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="intermediate">Intermedio</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="grid gap-6 md:grid-cols-2">
            <ExerciseCard
              title="Creación de Imágenes"
              description="Aprende a crear imágenes Docker desde cero"
              icon={<Terminal className="h-5 w-5" />}
              steps={[
                "Crear un Dockerfile para una aplicación Node.js simple",
                "Construir la imagen con docker build",
                "Etiquetar la imagen correctamente",
                "Ejecutar un contenedor basado en la imagen",
              ]}
              difficulty="Principiante"
              time="45 minutos"
            />

            <ExerciseCard
              title="Gestión de Contenedores"
              description="Domina los comandos básicos de Docker"
              icon={<Server className="h-5 w-5" />}
              steps={[
                "Ejecutar contenedores en diferentes modos",
                "Gestionar el ciclo de vida de los contenedores",
                "Inspeccionar logs y estadísticas",
                "Conectarse a contenedores en ejecución",
              ]}
              difficulty="Principiante"
              time="30 minutos"
            />
          </div>
        </TabsContent>

        <TabsContent value="intermediate">
          <div className="grid gap-6 md:grid-cols-2">
            <ExerciseCard
              title="Docker Compose"
              description="Configura aplicaciones multi-contenedor"
              icon={<Database className="h-5 w-5" />}
              steps={[
                "Crear un archivo docker-compose.yml",
                "Definir servicios, redes y volúmenes",
                "Gestionar dependencias entre servicios",
                "Escalar servicios con docker-compose",
              ]}
              difficulty="Intermedio"
              time="60 minutos"
            />

            <ExerciseCard
              title="Redes en Docker"
              description="Configura comunicación entre contenedores"
              icon={<Network className="h-5 w-5" />}
              steps={[
                "Crear redes personalizadas",
                "Conectar contenedores a múltiples redes",
                "Configurar DNS y resolución de nombres",
                "Implementar patrones de comunicación entre servicios",
              ]}
              difficulty="Intermedio"
              time="45 minutos"
            />
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid gap-6 md:grid-cols-2">
            <ExerciseCard
              title="Volúmenes y Persistencia"
              description="Gestiona datos persistentes en Docker"
              icon={<HardDrive className="h-5 w-5" />}
              steps={[
                "Implementar diferentes tipos de volúmenes",
                "Compartir datos entre contenedores",
                "Estrategias de backup y restauración",
                "Optimizar el rendimiento de volúmenes",
              ]}
              difficulty="Avanzado"
              time="60 minutos"
            />

            <ExerciseCard
              title="CI/CD con Docker"
              description="Integra Docker en pipelines de CI/CD"
              icon={<GitBranch className="h-5 w-5" />}
              steps={[
                "Configurar GitHub Actions con Docker",
                "Implementar pruebas automatizadas en contenedores",
                "Estrategias de despliegue con Docker",
                "Optimización de imágenes para producción",
              ]}
              difficulty="Avanzado"
              time="90 minutos"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recursos para la Práctica</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ResourceCard
            title="Archivos de Ejemplo"
            description="Descarga los archivos necesarios para completar los ejercicios"
            link="#archivos"
          />
          <ResourceCard
            title="Guía del Instructor"
            description="Instrucciones detalladas para facilitar la práctica grupal"
            link="#guia"
          />
        </div>
      </div>
    </div>
  )
}

function ExerciseCard({ title, description, icon, steps, difficulty, time }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2">Pasos:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Dificultad: {difficulty}</div>
        <div className="text-sm text-muted-foreground">Tiempo: {time}</div>
      </CardFooter>
    </Card>
  )
}

function ResourceCard({ title, description, link }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={link} passHref>
          <Button variant="outline" className="w-full">
            Descargar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

