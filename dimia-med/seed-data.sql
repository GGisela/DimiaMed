-- Ejecutar en Adminer (http://localhost:8081) o via mysql client
-- DB: dimiamed | User: dimiamed_user | Pass: ver .env del backend

INSERT INTO clinicas (nombre, direccion, zona, horarios, habilitada_srt) VALUES
('Centro Médico Norte',    'Av. Cabildo 1240, Belgrano',     'CABA — Zona Norte', 'Lun–Vie 8–18h',  true),
('Clínica San Martín',     'San Martín 540, Villa Urquiza',  'CABA — Zona Norte', 'Lun–Sáb 7–17h',  true),
('Instituto Médico Sur',   'Av. Rivadavia 5800, Caballito',  'CABA — Zona Sur',   'Lun–Vie 9–19h',  true),
('Centro Diagnóstico Oeste','Av. Gaona 2100, Flores',        'CABA — Zona Oeste', 'Lun–Sáb 8–16h',  false),
('Centro Médico GBA Norte','Av. Maipú 1900, San Isidro',    'GBA Norte',         'Lun–Vie 8–17h',  true),
('Clínica Del Sol',        'Mitre 450, Quilmes',             'GBA Sur',           'Lun–Sáb 7–20h',  true);
