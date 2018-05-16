package beans;

import java.util.ArrayList;
import java.util.Date;

public class Pregled {

	private int idPregleda;
	private Korisnik lekar;
	private Date datumPregleda;
	private ArrayList<Simptom> simptomi = new ArrayList<Simptom>();
	private Bolest dijagnostikovanaBolest;
	public Pregled() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Pregled(int idPregleda, Korisnik lekar, Date datumPregleda, ArrayList<Simptom> simptomi,
			Bolest dijagnostikovanaBolest) {
		super();
		this.idPregleda = idPregleda;
		this.lekar = lekar;
		this.datumPregleda = datumPregleda;
		this.simptomi = simptomi;
		this.dijagnostikovanaBolest = dijagnostikovanaBolest;
	}
	public int getIdPregleda() {
		return idPregleda;
	}
	public void setIdPregleda(int idPregleda) {
		this.idPregleda = idPregleda;
	}
	public Korisnik getLekar() {
		return lekar;
	}
	public void setLekar(Korisnik lekar) {
		this.lekar = lekar;
	}
	public Date getDatumPregleda() {
		return datumPregleda;
	}
	public void setDatumPregleda(Date datumPregleda) {
		this.datumPregleda = datumPregleda;
	}
	public ArrayList<Simptom> getSimptomi() {
		return simptomi;
	}
	public void setSimptomi(ArrayList<Simptom> simptomi) {
		this.simptomi = simptomi;
	}
	public Bolest getDijagnostikovanaBolest() {
		return dijagnostikovanaBolest;
	}
	public void setDijagnostikovanaBolest(Bolest dijagnostikovanaBolest) {
		this.dijagnostikovanaBolest = dijagnostikovanaBolest;
	}
	
}
