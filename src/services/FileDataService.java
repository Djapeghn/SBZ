package services;

import java.io.UnsupportedEncodingException;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import beans.Bolest;
import beans.FileData;
import beans.Korisnik;
import beans.Lek;
import beans.Pacijent;
import beans.Pregled;

@Path("/fileData")
public class FileDataService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getLekovi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Lek> getLekovi() {
		return getFileData().getLekValues();
	}
	
	@POST
	@Path("/addLek")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addLek(Lek lek) {
		if(getFileData().nazivExistsLekovi(lek.getNaziv())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate naziv\"}").build();
		}
		else if(getFileData().idExistsLekovi(lek.getIdLek())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate id\"}").build();
		}
		getFileData().getLekovi().put(lek.getIdLek(), lek);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyLek")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyLek(Lek lek) {
		if(getFileData().idExistsLekovi(lek.getIdLek())) {
			getFileData().getLekovi().put(lek.getIdLek(), lek);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Lek not found\"}").build();
	}
	
	@POST
	@Path("/deleteLek")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteLek(Lek lek) {
		if(getFileData().idExistsLekovi(lek.getIdLek())) {
			getFileData().getLekovi().remove(lek.getIdLek());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Lek\"}").build();
	}
	
	@GET
	@Path("/getBolesti")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Bolest> getBolesti() {
		return getFileData().getBolestValues();
	}
	
	@POST
	@Path("/addBolest")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addBolest(Bolest b) {
		if(getFileData().nazivExistsBolesti(b.getNaziv())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate naziv\"}").build();
		}
		else if(getFileData().idExistsBolesti(b.getIdBolest())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate id\"}").build();
		}
		getFileData().getBolesti().put(b.getIdBolest(), b);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyBolest")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyBolest(Bolest b) {
		if(getFileData().idExistsBolesti(b.getIdBolest())) {
			getFileData().getBolesti().put(b.getIdBolest(), b);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Bolest not found\"}").build();
	}
	
	@POST
	@Path("/deleteBolest")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteBolest(Bolest b) {
		if(getFileData().idExistsBolesti(b.getIdBolest())) {
			getFileData().getBolesti().remove(b.getIdBolest());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Bolest\"}").build();
	}
	
	@GET
	@Path("/getKorisnici")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Korisnik> getKorisnici() {
		return getFileData().getKorisnikValues();
	}
	
	@POST
	@Path("/addKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addKorisnik(Korisnik k) {
		if(getFileData().usernameExistsKorisnici(k.getKorisnickoIme())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate username\"}").build();
		}
		else if(getFileData().emailExistsKorisnici(k.getEmail())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate email\"}").build();
		}
		getFileData().getKorisnici().put(k.getIdKorisnik(), k);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyKorisnik(Korisnik k) {
		if(getFileData().idExistsKorisnici(k.getIdKorisnik())) {
			getFileData().getKorisnici().put(k.getIdKorisnik(), k);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Korisnik not found\"}").build();
	}
	
	@POST
	@Path("/checkValidity")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response checkValidity(Korisnik k) {
		if(getFileData().loginCheck(k)) {
			return Response.ok().build();
		}
		else {
			return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Korisnik not found\"}").build();
		}
	}
	
	@POST
	@Path("/deleteKorisnik")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteKorisnik(Korisnik k) {
		if(getFileData().idExistsKorisnici(k.getIdKorisnik())) {
			getFileData().getKorisnici().remove(k.getIdKorisnik());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Korisnik\"}").build();
	}
	
	@GET
	@Path("/getPregledi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Pregled> getPregledi() {
		return getFileData().getPregledValues();
	}
	
	@POST
	@Path("/addPregled")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addPregled(Pregled p) {
		if(getFileData().idExistsPregledi(p.getIdPregleda())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate id\"}").build();
		}
		getFileData().getPregledi().put(p.getIdPregleda(), p);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyPregled")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyPregled(Pregled p) {
		if(getFileData().idExistsPregledi(p.getIdPregleda())) {
			getFileData().getPregledi().put(p.getIdPregleda(), p);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Pregled not found\"}").build();
	}
	
	@POST
	@Path("/deletePregled")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deletePregled(Pregled p) {
		if(getFileData().idExistsPregledi(p.getIdPregleda())) {
			getFileData().getPregledi().remove(p.getIdPregleda());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Pregled\"}").build();
	}
	
	@GET
	@Path("/getPacijenti")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Pacijent> getPacijenti() {
		return getFileData().getPacijentValues();
	}
	
	@POST
	@Path("/addPacijent")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addPacijent(Pacijent pac) {
		if(getFileData().idExistsPacijenti(pac.getIdPacijent())) {
			return Response.status(Status.CONFLICT).entity("{\"msg\":\"Duplicate id\"}").build();
		}
		getFileData().getPacijenti().put(pac.getIdPacijent(), pac);
		getFileData().writeData();
		return Response.ok().build();
	}
	
	@POST
	@Path("/modifyPacijent")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response modifyPacijent(Pacijent pac) {
		if(getFileData().idExistsPacijenti(pac.getIdPacijent())) {
			getFileData().getPacijenti().put(pac.getIdPacijent(), pac);
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Pacijent not found\"}").build();
	}
	
	@POST
	@Path("/deletePacijent")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deletePacijent(Pacijent p) {
		if(getFileData().idExistsPacijenti(p.getIdPacijent())) {
			getFileData().getPacijenti().remove(p.getIdPacijent());
			getFileData().writeData();
			return Response.ok().build();
		}
		return Response.status(Status.NOT_FOUND).entity("{\"msg\":\"Error updating Pacijent\"}").build();
	}
	
	private FileData getFileData() {
		FileData fileData = (FileData) ctx.getAttribute("fileData");
		if (fileData == null) {
			//fileData = new FileData(ctx.getRealPath(""));
			try {
				fileData = new FileData();
				ctx.setAttribute("fileData", fileData);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return fileData;
	}
}
