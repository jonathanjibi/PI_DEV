package com.esprit.spring.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esprit.spring.Email.IEmailService;
import com.esprit.spring.entites.Product;
import com.esprit.spring.entites.Stock;
import com.esprit.spring.entites.StockDetail;
import com.esprit.spring.repository.ProductRepository;
import com.esprit.spring.repository.StockDetailRepository;
import com.esprit.spring.repository.StockRepository;




@Service
public class StockDetailServiceImpl implements IStockDetailService{
	
	
	@Autowired(required =true)
	IEmailService emailService;
	
	
	@Autowired
	StockRepository stockRepository;
	
	@Autowired
	StockDetailRepository stockDetailRepository;
	
	@Autowired
	ProductRepository productRepository;

	@Override
	public void addStockDetail(StockDetail stockDetail) {
		// TODO Auto-generated method stub
		
		stockDetailRepository.save(stockDetail);
	}

	@Override
	public void deleteStockDetailById(int id) {
		// TODO Auto-generated method stub
		
		stockDetailRepository.deleteById(id);
		
	}

	@Override
	public StockDetail updatestockDetail(StockDetail stock) {
		// TODO Auto-generated method stub
		stockDetailRepository.save(stock);
		return null;
		
	}

	@Override
	public StockDetail getStockDetailById(int id) {
		// TODO Auto-generated method stub
		
		StockDetail stcd =stockDetailRepository.findById(id).orElse(null);
		return stcd;
	}

	@Override
	public Iterable<StockDetail> getAllStockDetail() {
		// TODO Auto-generated method stub
		
		Iterable<StockDetail> I = stockDetailRepository.findAll();
		
		return I;
	}

	@Override
	public void deleteAllStockDetail() {
		// TODO Auto-generated method stub
		stockDetailRepository.deleteAll();
	}

	
	
	
	
	
	@Transactional
	@Override
	public StockDetail affectationProduitDansStockDetail(int idProd, int idStock){
		// TODO Auto-generated method stub
		
		StockDetail stcd = stockDetailRepository.findById(idStock).get();
		  Product   prod =  productRepository.findById(idProd).get();
		  
		  
		  
		  if(stcd.getProduct() == null){
			  
			  
			  //Product produit = new Product(idProd);
			  stcd.setProduct(prod);
			 return stockDetailRepository.save(stcd);
		  }
			 
		  else{
			  stcd.setProduct(prod);
		  return stockDetailRepository.save(stcd);
		  }
		
	}

	@Override
	public StockDetail desaffectationProduit(int idStock) {
		// TODO Auto-generated method stub
		StockDetail stcd = stockDetailRepository.findById(idStock).get();
		     
		if(stcd.getProduct()!=null){
			  stcd.setProduct(null);
			  return stockDetailRepository.save(stcd);}
		
		else{
			return null;
		}
	}
	
	

	
	public void sendnotif(int idStockD) {
	// TODO Auto-generated method stub
		
		StockDetail stockD = stockDetailRepository.findById(idStockD).get();
		
		//stockD.getDexpiration().compareTo(stockD.getDexpiration());

		if(stockD.getQuantiteInstan() <= stockD.getQuantiteMin()){
			
		String t = "jonathan.jibjikilayi@esprit.tn";
		String sub = "Alert Quotas Attient !!!";
		String b = "le produit:"+stockD.getProduct().getName()+"l'ID"+stockD.getProduct().getId()+"Detail du produit:"+stockD.getProduct().getDescription()+"sera un rupture bientot le quotas minimum est atteind\n"
					+ "merci de bien vouloir vour ravitailler aupres de votre fournisseur";
		
		emailService.sendMail(t, sub, b);
	
		}		}
	
	
	public List<StockDetail> sendnotifProductExpiration()
	{
		SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date today = new Date(System.currentTimeMillis());

		System.out.println(formatter.format(today));
		 
		List <StockDetail> list = (List <StockDetail>) stockDetailRepository.findAll();
		List <StockDetail> listProductExpiration = new ArrayList<StockDetail>();
		
		 for(StockDetail stockD : list ){
			 
			 if(stockD.getDexpiration().compareTo(today)==0){
				 listProductExpiration.add(stockD);
				 
				 String t = "jibdany03@gmail.com";
					String sub = "Alert  Produit!!!!! ";
				 
					String b = "le produit:"+stockD.getProduct().getName()+"l'ID"+stockD.getProduct().getId()+
							"Detail du produit:"+stockD.getProduct().getDescription()+"ce stock vient d expirer veuillez le retirer du depot\n"
							+ "merci de bien vouloir vour ravitailler aupres de votre fournisseur";
				 
					emailService.sendMail(t, sub, b);		
					
			            }
			 
			 else 
				 if(stockD.getDexpiration().compareTo(today)<0){
					 
					 listProductExpiration.add(stockD);
					 
					 String t = "jibdany03@gmail.com";
						String sub = "Alert !!!!! ";
					 
						String b = "le produit:"+stockD.getProduct().getName()+"l'ID"+stockD.getProduct().getId()+
								"Detail du produit:"+stockD.getProduct().getDescription()+"ce stock vient d expirer veuillz le retirer du depot\n"
								+ "merci de bien vouloir vour ravitailler aupres de votre fournisseur";
					 
						emailService.sendMail(t, sub, b);	
					 
					 
				 }
			  }
	
		 return listProductExpiration;
		}
	
	
	
	
	
	
	
	
	public int descrementStock(int idStockdetail, int nbrProduct){
		
		StockDetail stockD = stockDetailRepository.findById(idStockdetail).get();
		
		int quantity =stockD.getQuantiteInstan()-nbrProduct;
	
		stockD.setQuantiteInstan(quantity);
		stockDetailRepository.save(stockD);
		
if(stockD.getQuantiteInstan() <= stockD.getQuantiteMin()){
			
			String t = "jibdany03@gmail.com";
			String sub = "Alert stock securité Attient !!!";
			String b = "bonjour mr jonathan,\n "+stockD.getProduct().getName()+" "+"l'ID"+stockD.getProduct().getId()+"Detail du produit:"
			+stockD.getProduct().getDescription()+"sera un rupture bientot le quotas minimum est atteind\n"
					+ "merci de bien vouloir vour ravitailler aupres de votre fournisseur";
			
			emailService.sendMail(t, sub, b);
		
	}

  return quantity;
	
	}
	
	
	
	public void affectaionStockToStockDetail( int idStock, int idStockDetail)
	{
		StockDetail stockD = stockDetailRepository.findById(idStockDetail).get();
		Stock stock = stockRepository.findById(idStock).get();
				
		stock.getStockDeatail().add(stockD);
				
		
		
	}
	
	
//	
//  public Date incrementeDateExpiretion(Date datexpiration){
//	  
//	  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//	  Calendar c = Calendar.getInstance();
//	  try {
//	  	c.setTime(datexpiration);
//	  } catch (ParseException e) {
//	  	// TODO Auto-generated catch block
//	  	e.printStackTrace();
//	  }
//	  c.add(Calendar.DATE, -2);  // number of days to add
//	 // dt = sdf.format(c.getTime());
//	  
//	  return c;
//  }
//	
//
//	public void sendNotifSoldeStock(StockDetail stcd)
//	{
//
//		List <StockDetail> list = (List <StockDetail>) stockDetailRepository.findAll();
//		SimpleDateFormat sdf =new  SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		Calendar c =Calendar.getInstance();
//		
//		
//		
//		
//		
//		for(StockDetail stcD : list){
//			if(stcD.getProduct().getCategory() == "Alimentaire" && stcD.getDexpiration().compareTo(arg0))
//			{
//				
//			}
//			
//		}
//	}
	
	
	


	
	

	
}
