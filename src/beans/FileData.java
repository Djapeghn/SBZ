package beans;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class FileData {

	private HashMap<String, Lek> lekovi = new HashMap<String, Lek>();
	private HashMap<String, Korisnik> korisnici = new HashMap<String,Korisnik>();
	private HashMap<String, Bolest> bolesti = new HashMap<String,Bolest>();
	private HashMap<String, Pregled> pregledi = new HashMap<String,Pregled>();
	private HashMap<String, Pacijent> pacijenti = new HashMap<String,Pacijent>();
	private String path;
	
	public FileData() throws UnsupportedEncodingException {
		super();
		BufferedReader in = null;
		this.path = getPathReal();
		try {
			readLekovi(path);
			readKorisnici(path);
			readBolesti(path);
			readPregledi(path);
			readPacijenti(path);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
	public void writeData() {
		
		PrintWriter out = null;
		try {
			writeLekovi(this.path);
			writeKorisnici(this.path);
			writeBolesti(this.path);
			writePregledi(this.path);
			writePacijenti(this.path);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if ( out != null ) {
				try {
					out.close();
				}
				catch (Exception e) { }
			}
		}
		
	}
	
	private void readLekovi(String path) {

        try {
            
            String idLek = "", naziv = "";
            ArrayList<Sastojak> sastojci = new ArrayList<Sastojak>();
            GrupaLekova grupaLekova;
            Lek lek = new Lek();
            
        	
			File file = new File(path + "/files/lekoviNew");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
            String readLine = "";
            String[] splittedLine;
            
            while ((readLine = bufferedReader.readLine()) != null) {
                
            	splittedLine = readLine.split("\\|",5000);
				
				idLek = splittedLine[0];
				naziv = splittedLine[1];
				
				String[] splittedSastojci = splittedLine[2].split(";");
				
				for(String sastojak : splittedSastojci) {
					
					sastojci.add(Sastojak.valueOf(sastojak));
				}
				
				grupaLekova = GrupaLekova.valueOf(splittedLine[3]);
				
				lek = new Lek(idLek,naziv,sastojci,grupaLekova);
				
				lekovi.put(idLek, lek);
				
	            idLek = "";
	            naziv = "";
	            sastojci = new ArrayList<Sastojak>();
	            lek = new Lek();
				
				//System.out.println(lek.toString());
            }

			fileReader.close();
			bufferedReader.close();
            

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	private void readKorisnici(String path) {

        try {
        	
        	String idKorisnik = "", ime = "", prezime = "",
        	email = "", korisnickoIme = "", lozinka = "";
        	Date datumRodjenja;
        	TipKorisnika tipKorisnika;
        	Korisnik k = new Korisnik();
            
			File file = new File(path + "/files/korisniciNew");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
            String readLine = "";
            String[] splittedLine;
            
            while ((readLine = bufferedReader.readLine()) != null) {
                
            	splittedLine = readLine.split("\\|",5000);
				
				idKorisnik = splittedLine[0];
				ime = splittedLine[1];
				prezime = splittedLine[2];
				email = splittedLine[3];
				datumRodjenja = convertStringToDate(splittedLine[4]);
				korisnickoIme = splittedLine[5];
				lozinka = splittedLine[6];
				tipKorisnika = TipKorisnika.valueOf(splittedLine[7]);
				
				k = new Korisnik(idKorisnik, ime, prezime, email, datumRodjenja, korisnickoIme, lozinka, tipKorisnika);
				
				korisnici.put(idKorisnik, k);
				
	        	idKorisnik = "";
	        	ime = "";
	        	prezime = "";
	            email = "";
	            korisnickoIme = "";
	            lozinka = "";
	            datumRodjenja = new Date();
	            k = new Korisnik();
				
				//System.out.println(k.toString());
            }

			fileReader.close();
			bufferedReader.close();
            

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	private void readBolesti(String path) {

        try {
        	
        	String idBolest = "", naziv = "";
        	GrupaBolesti grupa;
        	ArrayList<Simptom> opstiSimptomi = new ArrayList<Simptom>();
        	ArrayList<Simptom> specificniSimptomi = new ArrayList<Simptom>();
        	Bolest b = new Bolest();
            
			File file = new File(path + "/files/bolestiNew");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
            String readLine = "";
            String[] splittedLine;
            
            while ((readLine = bufferedReader.readLine()) != null) {
                
            	splittedLine = readLine.split("\\|",5000);
				
				idBolest = splittedLine[0];
				naziv = splittedLine[1];
				grupa = GrupaBolesti.valueOf(splittedLine[2]);
				String[] splittedSimptomi = splittedLine[3].split(";");
				
				for(String simptomString : splittedSimptomi) {
					
					String[] splittedSimptomString = simptomString.split(":");
					
					if(splittedSimptomString.length>1) {
						if(splittedSimptomString[1].equals("1")) {
							
							opstiSimptomi.add(Simptom.valueOf(splittedSimptomString[0]));
							
						} else {
							
							specificniSimptomi.add(Simptom.valueOf(splittedSimptomString[0]));
							
						}
					}
				}
				
				b = new Bolest(idBolest, naziv, grupa, opstiSimptomi, specificniSimptomi);
				
				bolesti.put(idBolest, b);
				
	        	idBolest = "";
	        	naziv = "";
	        	opstiSimptomi = new ArrayList<Simptom>();
	        	specificniSimptomi = new ArrayList<Simptom>();
	        	b = new Bolest();
				
				//System.out.println(b.toString());
            }

			fileReader.close();
			bufferedReader.close();
            

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	private void readPregledi(String path) {

        try {
        	
        	String idPregleda = "";
        	Korisnik lekar = new Korisnik();
        	Date datumPregleda;
        	ArrayList<Simptom> simptomi = new ArrayList<Simptom>();
        	Bolest dijagnostikovanaBolest = new Bolest();
        	Lek propisanLek = new Lek();
        	Pregled p = new Pregled();
            
			File file = new File(path + "/files/preglediNew");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
            String readLine = "";
            String[] splittedLine;
            
            while ((readLine = bufferedReader.readLine()) != null) {
                
            	splittedLine = readLine.split("\\|",5000);
				
				idPregleda = splittedLine[0];
				
				if(korisnici.containsKey(splittedLine[1])) {
					lekar = korisnici.get(splittedLine[1]);
				}
				datumPregleda = convertStringToDate(splittedLine[2]);
				
				if(!splittedLine[3].equals("")) {
				
					String[] splittedSimptomi = splittedLine[3].split(";");
				
					for(String simptomString : splittedSimptomi) {
						
						simptomi.add(Simptom.valueOf(simptomString));
					}
				}
				
				if(bolesti.containsKey(splittedLine[4])) {
					dijagnostikovanaBolest = bolesti.get(splittedLine[4]);
				}
				
				if(lekovi.containsKey(splittedLine[5])) {
					propisanLek = lekovi.get(splittedLine[5]);
				}
				
				p = new Pregled(idPregleda,lekar,datumPregleda,simptomi,dijagnostikovanaBolest,propisanLek);
				
				pregledi.put(idPregleda, p);
				
	        	idPregleda = "";
	        	lekar = new Korisnik();
	        	datumPregleda = new Date();
	        	simptomi = new ArrayList<Simptom>();
	        	dijagnostikovanaBolest = new Bolest();
	        	propisanLek = new Lek();
	        	p = new Pregled();
				
				//System.out.println(p.toString());
            }

			fileReader.close();
			bufferedReader.close();
            

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	private void readPacijenti(String path) {

        try {
        	
        	String idPacijent = "", ime = "", prezime = "", pol = "";
        	Date datumRodjenja;
        	ArrayList<Pregled> preglediPacijenta = new ArrayList<Pregled>();
        	ArrayList<Bolest> bolestiPacijenta = new ArrayList<Bolest>();
        	ArrayList<Lek> alergicanNaLekove = new ArrayList<Lek>();
        	Pacijent p = new Pacijent();
            
			File file = new File(path + "/files/pacijentiNew");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
            String readLine = "";
            String[] splittedLine;
            
            while ((readLine = bufferedReader.readLine()) != null) {
                
            	splittedLine = readLine.split("\\|",5000);
				
				idPacijent = splittedLine[0];
				ime = splittedLine[1];
				prezime = splittedLine[2];
				datumRodjenja = convertStringToDate(splittedLine[3]);
				pol = splittedLine[4];
				
				if(!(splittedLine[5].equals(""))) {
					
					String[] splittedPregledi = splittedLine[5].split(";");
					
					for(int i=0; i<splittedPregledi.length; i++) {
						if(pregledi.containsKey(splittedPregledi[i])) {
							preglediPacijenta.add(pregledi.get(splittedPregledi[i]));
						}
					}
					
				}
				
				if(!(splittedLine[6].equals(""))) {
					
					String[] splittedBolesti = splittedLine[6].split(";");
					
					for(int i=0; i<splittedBolesti.length; i++) {
						if(bolesti.containsKey(splittedBolesti[i])) {
							bolestiPacijenta.add(bolesti.get(splittedBolesti[i]));
						}
					}
					
				}
				
				if(!(splittedLine[7].equals(""))) {
					
					String[] splittedLekovi = splittedLine[7].split(";");
					
					for(int i=0; i<splittedLekovi.length; i++) {
						if(lekovi.containsKey(splittedLekovi[i])) {
							alergicanNaLekove.add(lekovi.get(splittedLekovi[i]));
						}
					}
					
				}
				
				p = new Pacijent(idPacijent, ime, prezime, datumRodjenja, pol, preglediPacijenta, bolestiPacijenta, alergicanNaLekove);
				
				pacijenti.put(idPacijent, p);
				
	        	idPacijent = "";
	        	ime = "";
	        	prezime = "";
	        	pol = "";
	        	datumRodjenja = new Date();
	        	preglediPacijenta = new ArrayList<Pregled>();
	        	bolestiPacijenta = new ArrayList<Bolest>();
	        	alergicanNaLekove = new ArrayList<Lek>();
	        	p = new Pacijent();
				
				//System.out.println(p.toString());
				
            }

			fileReader.close();
			bufferedReader.close();
			

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	private void writeLekovi(String path) {

		String total = "";
		StringBuilder sb = new StringBuilder(total);
		
		for(Lek lek : getLekValues()) {

			sb.append(lek.toFileString());
			sb.append("\n");
			
		}
		sb.deleteCharAt(sb.length()-1);
		try {
		    FileWriter file = new FileWriter(path+"/files/lekoviNew");
		    file.write(sb.toString());
		    file.flush();
		    file.close();
		    
		} catch (IOException e) {
		    e.printStackTrace();
		}
		
	}
	
	private void writeKorisnici(String path) {

		String total = "";
		StringBuilder sb = new StringBuilder(total);
		
		for(Korisnik kor : getKorisnikValues()) {

			sb.append(kor.toFileString());
			sb.append("\n");
			
		}
		sb.deleteCharAt(sb.length()-1);
		try {
		    FileWriter file = new FileWriter(path+"/files/korisniciNew");
		    file.write(sb.toString());
		    file.flush();
		    file.close();
		    
		} catch (IOException e) {
		    e.printStackTrace();
		}
		
	}
	
	private void writeBolesti(String path) {

		String total = "";
		StringBuilder sb = new StringBuilder(total);
		
		for(Bolest bol : getBolestValues()) {

			sb.append(bol.toFileString());
			sb.append("\n");
			
		}
		sb.deleteCharAt(sb.length()-1);
		try {
		    FileWriter file = new FileWriter(path+"/files/bolestiNew");
		    file.write(sb.toString());
		    file.flush();
		    file.close();
		    
		} catch (IOException e) {
		    e.printStackTrace();
		}
		
	}
	
	private void writePregledi(String path) {

		String total = "";
		StringBuilder sb = new StringBuilder(total);
		
		for(Pregled pre : getPregledValues()) {

			sb.append(pre.toFileString());
			sb.append("\n");
			
		}
		sb.deleteCharAt(sb.length()-1);
		try {
		    FileWriter file = new FileWriter(path+"/files/preglediNew");
		    file.write(sb.toString());
		    file.flush();
		    file.close();
		    
		} catch (IOException e) {
		    e.printStackTrace();
		}
		
	}
	
	private void writePacijenti(String path) {

		String total = "";
		StringBuilder sb = new StringBuilder(total);
		
		for(Pacijent pac : getPacijentValues()) {

			sb.append(pac.toFileString());
			sb.append("\n");
			
		}
		sb.deleteCharAt(sb.length()-1);
		try {
		    FileWriter file = new FileWriter(path+"/files/pacijentiNew");
		    file.write(sb.toString());
		    file.flush();
		    file.close();
		    
		} catch (IOException e) {
		    e.printStackTrace();
		}
		
	}
	
	/** Vraca kolekciju Lekova. */
	public Collection<Lek> getLekValues() {
		return lekovi.values();
	}
	/** Vraca kolekciju Korisnika. */
	public Collection<Korisnik> getKorisnikValues() {
		return korisnici.values();
	}
	/** Vraca kolekciju Bolesti. */
	public Collection<Bolest> getBolestValues() {
		return bolesti.values();
	}
	/** Vraca kolekciju Pregleda. */
	public Collection<Pregled> getPregledValues() {
		return pregledi.values();
	}
	/** Vraca kolekciju Pacijenata. */
	public Collection<Pacijent> getPacijentValues() {
		return pacijenti.values();
	}
	
	/** Vraca lek na osnovu njegovog id-a. */
	public Lek getLek(String id) {
		return lekovi.get(id);
	}
	/** Vraca Korisnika na osnovu njegovog id-a. */
	public Korisnik getKorisnik(String id) {
		return korisnici.get(id);
	}
	/** Vraca Bolest na osnovu njenog id-a. */
	public Bolest getBolest(String id) {
		return bolesti.get(id);
	}
	/** Vraca Pregled na osnovu njegovog id-a. */
	public Pregled getPregled(String id) {
		return pregledi.get(id);
	}
	/** Vraca Pacijenta na osnovu njegovog id-a. */
	public Pacijent getPacijent(String id) {
		return pacijenti.get(id);
	}
	
	public HashMap<String, Lek> getLekovi() {
		return lekovi;
	}
	public void setLekovi(HashMap<String, Lek> lekovi) {
		this.lekovi = lekovi;
	}
	public HashMap<String, Korisnik> getKorisnici() {
		return korisnici;
	}
	public void setKorisnici(HashMap<String, Korisnik> korisnici) {
		this.korisnici = korisnici;
	}
	public HashMap<String, Bolest> getBolesti() {
		return bolesti;
	}
	public void setBolesti(HashMap<String, Bolest> bolesti) {
		this.bolesti = bolesti;
	}
	public HashMap<String, Pregled> getPregledi() {
		return pregledi;
	}
	public void setPregledi(HashMap<String, Pregled> pregledi) {
		this.pregledi = pregledi;
	}
	public HashMap<String, Pacijent> getPacijenti() {
		return pacijenti;
	}
	public void setPacijenti(HashMap<String, Pacijent> pacijenti) {
		this.pacijenti = pacijenti;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	private Date convertStringToDate(String dateString)
	{
	    Date date = null;
	    DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
	    try{
	        date = df.parse(dateString);
	    }
	    catch ( Exception ex ){
	        System.out.println(ex);
	    }
	    return date;
	}
	
	public boolean idExistsLekovi(String id) {
		for(String key : lekovi.keySet()) {
			if(key.equalsIgnoreCase(id)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean nazivExistsLekovi(String naziv) {
		for(Lek lek : lekovi.values()) {
			if((lek.getNaziv()).equalsIgnoreCase(naziv)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean idExistsKorisnici(String id) {
		for(String key : korisnici.keySet()) {
			if(key.equalsIgnoreCase(id)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean emailExistsKorisnici(String email) {
		for(Korisnik k : korisnici.values()) {
			if((k.getEmail()).equalsIgnoreCase(email)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean usernameExistsKorisnici(String username) {
		for(Korisnik k : korisnici.values()) {
			if((k.getKorisnickoIme()).equalsIgnoreCase(username)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean loginCheck(Korisnik k1) {
		for(Korisnik k : korisnici.values()) {
			if((k.getKorisnickoIme()).equalsIgnoreCase(k1.getKorisnickoIme())) {
				if(k.getLozinka().equalsIgnoreCase(k1.getLozinka())) {
					return true;
				}
			}
		}
		return false;
	}
	
	public boolean idExistsBolesti(String id) {
		for(String key : bolesti.keySet()) {
			if(key.equalsIgnoreCase(id)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean nazivExistsBolesti(String naziv) {
		for(Bolest b : bolesti.values()) {
			if((b.getNaziv()).equalsIgnoreCase(naziv)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean idExistsPregledi(String id) {
		for(String key : pregledi.keySet()) {
			if(key.equalsIgnoreCase(id)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean idExistsPacijenti(String id) {
		for(String key : pacijenti.keySet()) {
			if(key.equalsIgnoreCase(id)) {
				return true;
			}
		}
		return false;
	}
	
	public String getPathReal() throws UnsupportedEncodingException {

		String path = this.getClass().getClassLoader().getResource("").getPath();
		String fullPath = URLDecoder.decode(path, "UTF-8");
		String pathArr[] = fullPath.split("/WEB-INF/classes/");
		System.out.println(fullPath);
		System.out.println(pathArr[0]);
		fullPath = pathArr[0];
		
		return fullPath;
		/*String reponsePath = "";

		// to read a file from webcontent

		reponsePath = new File(fullPath).getPath() + File.separatorChar + "newfile.txt";

		return reponsePath;*/

		}
	
	public Bolest getAllSimptomi() {
		
		Simptom[] simptoms = Simptom.values();
		ArrayList<Simptom> simptoms1 = new ArrayList<Simptom>();
		for(int i=0; i<simptoms.length; i++) {
			simptoms1.add(simptoms[i]);
		}
		Bolest b = new Bolest("placeholder","placeholder",GrupaBolesti.PRVA,simptoms1,simptoms1);
		return b;
		
	}
	
	public Lek getAllSastojci() {
		
		Sastojak[] sastojaks = Sastojak.values();
		ArrayList<Sastojak> sastojaks1 = new ArrayList<Sastojak>();
		for(int i=0; i<sastojaks.length; i++) {
			sastojaks1.add(sastojaks[i]);
		}
		Lek le = new Lek("placeholder","placeholder",sastojaks1,GrupaLekova.ANTIBIOTICI);
		return le;
		
	}
	
}
