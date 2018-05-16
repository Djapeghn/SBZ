package beans;

import java.util.Date;

public class Korisnik {

	private String ime;
	private String prezime;
	private Date datumRodjenja;
	private String korisnickoIme;
	private String lozinka;
	private TipKorisnika tipKorisnika;
	public Korisnik() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Korisnik(String ime, String prezime, Date datumRodjenja, String korisnickoIme, String lozinka,
			TipKorisnika tipKorisnika) {
		super();
		this.ime = ime;
		this.prezime = prezime;
		this.datumRodjenja = datumRodjenja;
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.tipKorisnika = tipKorisnika;
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
		return "Korisnik [ime=" + ime + ", prezime=" + prezime + ", datumRodjenja=" + datumRodjenja + ", korisnickoIme="
				+ korisnickoIme + ", lozinka=" + lozinka + ", tipKorisnika=" + tipKorisnika + "]";
	}
	
	
	
}
