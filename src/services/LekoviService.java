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

import beans.*;

@Path("/lekoviData")
public class LekoviService {

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
	
	private FileData getFileData() {
		FileData fileData = (FileData) ctx.getAttribute("fileData");
		if (fileData == null) {
			//fileData = new FileData(ctx.getRealPath(""));
			try {
				fileData = new FileData();
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ctx.setAttribute("fileData", fileData);
		} 
		return fileData;
	}
	
}
