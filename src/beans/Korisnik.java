package beans;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Korisnik {

	private String idKorisnik;
	private String ime;
	private String prezime;
	private String email;
	private Date datumRodjenja;
	private String korisnickoIme;
	private String lozinka;
	private TipKorisnika tipKorisnika;
	public Korisnik() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Korisnik(String idKorisnik, String ime, String prezime, String email, Date datumRodjenja,
			String korisnickoIme, String lozinka, TipKorisnika tipKorisnika) {
		super();
		this.idKorisnik = idKorisnik;
		this.ime = ime;
		this.prezime = prezime;
		this.email = email;
		this.datumRodjenja = datumRodjenja;
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.tipKorisnika = tipKorisnika;
	}
	public String getIdKorisnik() {
		return idKorisnik;
	}
	public void setIdKorisnik(String idKorisnik) {
		this.idKorisnik = idKorisnik;
	}
	public String getIme() {
		return ime;
	}
	public void setIme(String ime) {
		this.ime = ime;
	}
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDatumRodjenja() {
		return datumRodjenja;
	}
	public void setDatumRodjenja(Date datumRodjenja) {
		this.datumRodjenja = datumRodjenja;
	}
	public String getKorisnickoIme() {
		return korisnickoIme;
	}
	public void setKorisnickoIme(String korisnickoIme) {
		this.korisnickoIme = korisnickoIme;
	}
	public String getLozinka() {
		return lozinka;
	}
	public void setLozinka(String lozinka) {
		this.lozinka = lozinka;
	}
	public TipKorisnika getTipKorisnika() {
		return tipKorisnika;
	}
	public void setTipKorisnika(TipKorisnika tipKorisnika) {
		this.tipKorisnika = tipKorisnika;
	}
	@Override
	public String toString() {
		return "Korisnik [idKorisnik=" + idKorisnik + ", ime=" + ime + ", prezime=" + prezime + ", email=" + email
				+ ", datumRodjenja=" + datumRodjenja + ", korisnickoIme=" + korisnickoIme + ", lozinka=" + lozinka
				+ ", tipKorisnika=" + tipKorisnika + "]";
	}

	public String toFileString() {
		
		String str = idKorisnik + "|" + ime + "|" + prezime + "|" + email + "|" + convertDateToString(datumRodjenja) + "|"
		+ korisnickoIme + "|" + lozinka + "|" + tipKorisnika;
		
		return str;
		
	}
	
	private String convertDateToString(Date d)
	{
		String dateString = "";
	    DateFormat df = new SimpleDateFormat("dd.MM.yyyy.");
	    try{
	        dateString = df.format(d);
	    }
	    catch ( Exception ex ){
	        System.out.println(ex);
	    }
	    return dateString;
	}
	
}
