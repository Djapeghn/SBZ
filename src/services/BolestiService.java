package services;

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

import beans.*;

@Path("/bolestiData")
public class BolestiService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;

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
	
	private FileData getFileData() {
		FileData fileData = (FileData) ctx.getAttribute("fileData");
		if (fileData == null) {
			fileData = new FileData(ctx.getRealPath(""));
			ctx.setAttribute("fileData", fileData);
		} 
		return fileData;
	}
}
