fn main() {
  tauri_build::build()
}


/*
-- client
CREATE TABLE client (
	id_cli INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	nom_cli INTEGER,
	resp_cli TEXT,
	email_cli TEXT,
	tel_cli TEXT,
	adr_cli TEXT,
	cp_cli INTEGER,
	ville_cli TEXT
);


-- tr_age_repas
CREATE TABLE tr_age_repas (
	id_tr_age INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	age_min INTEGER,
	age_max INTEGER,
	lib_tr_age TEXT
);


-- dossier
CREATE TABLE dossier (
	id_dossier INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	id_cli INTEGER, nbNuitEnfant INTEGER, nbNuitAdulte INTEGER, loc_draps INTEGER, repas_servi INTEGER, notes TEXT,
	CONSTRAINT dossier_client_FK FOREIGN KEY (id_cli) REFERENCES client(id_cli) ON DELETE CASCADE ON UPDATE CASCADE
);


-- service
CREATE TABLE service (
	id_serv INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	id_dossier INTEGER,
	id_tr_age INTEGER,
	nbRepas INTEGER,
	CONSTRAINT service_tr_age_repas_FK FOREIGN KEY (id_tr_age) REFERENCES tr_age_repas(id_tr_age),
	CONSTRAINT service_dossier_FK FOREIGN KEY (id_dossier) REFERENCES dossier(id_dossier)
);
*/