import pg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL no definido");
}

const pool = new Pool({ connectionString: DATABASE_URL });

const services = [
  { name: "Electricidad", description: "Instalaciones eléctricas residenciales e industriales con certificación SEC. Desde enchufes hasta tableros industriales y automatización.", category: "ambos", icon: "Zap" },
  { name: "Gasfitería", description: "Redes de agua potable, alcantarillado y gasfitería completa para hogares y plantas industriales. Urgencias 24/7.", category: "ambos", icon: "Wrench" },
  { name: "Pintura", description: "Pintura interior, exterior e industrial. Productos premium Sherwin-Williams y Sikkens con garantía de durabilidad.", category: "ambos", icon: "Paintbrush" },
  { name: "Techumbres", description: "Instalación y reparación de techos residenciales e industriales. Sellamos goteras y garantizamos impermeabilidad.", category: "ambos", icon: "HomeIcon" },
  { name: "Jardinería", description: "Mantención y diseño de jardines residenciales y áreas verdes para condominios e industrias.", category: "ambos", icon: "Leaf" },
  { name: "Estructuras Metálicas", description: "Fabricación e instalación de estructuras metálicas para hogares y grandes proyectos industriales. Soldadura certificada.", category: "ambos", icon: "Building2" },
  { name: "Construcción y Remodelación", description: "Proyectos completos de construcción y remodelación. Desde quinchos y baños hasta plantas industriales y oficinas modulares.", category: "ambos", icon: "Briefcase" },
  { name: "Mantención Industrial", description: "Mantención preventiva, correctiva y predictiva para plantas industriales. Reducimos tiempos de parada y aumentamos la vida útil de sus equipos.", category: "industrial", icon: "Settings2" },
  { name: "Piping Industrial", description: "Fabricación de spool, soldadura TIG/MIG y redes de tuberías industriales para todo tipo de fluidos.", category: "industrial", icon: "Pipette" },
  { name: "Obras Civiles Industriales", description: "Obras civiles para proyectos industriales: fundaciones, pavimentos y estructuras de hormigón.", category: "industrial", icon: "Layers" },
  { name: "Montaje Industrial", description: "Montaje de equipos y estructuras industriales con personal certificado.", category: "industrial", icon: "Hammer" },
  { name: "Seguridad Industrial", description: "Implementación de sistemas y protocolos de seguridad industrial.", category: "industrial", icon: "HardHat" },
  { name: "Energías Renovables", description: "Diseño e instalación de sistemas de energía solar y renovable para hogares e industrias.", category: "industrial", icon: "Sun" },
];

async function main() {
  console.log("Insertando servicios...");
  for (const s of services) {
    await pool.query(
      `INSERT INTO services (name, description, category, icon) VALUES ($1, $2, $3, $4)`,
      [s.name, s.description, s.category, s.icon],
    );
  }
  console.log(`${services.length} servicios insertados.`);

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@pozohomebusiness.cl";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "CambiarPassword123!";
  const adminName = process.env.SEED_ADMIN_NAME ?? "Administrador";

  console.log("Creando admin...");
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await pool.query(
    `INSERT INTO admins (email, name, password_hash, is_active) VALUES ($1, $2, $3, true)
     ON CONFLICT (email) DO NOTHING`,
    [adminEmail, adminName, passwordHash],
  );
  console.log(`Admin creado: ${adminEmail} / contraseña: ${adminPassword}`);

  await pool.end();
  console.log("Listo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
