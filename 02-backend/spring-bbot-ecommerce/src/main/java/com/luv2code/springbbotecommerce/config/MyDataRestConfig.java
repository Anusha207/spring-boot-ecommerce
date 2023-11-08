package com.luv2code.springbbotecommerce.config;

import com.luv2code.springbbotecommerce.entity.Product;
import com.luv2code.springbbotecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
//import org.hibernate.type.EntityType;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@CrossOrigin("http://localhost:4200")

public class MyDataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){

        entityManager=theEntityManager;
    }
    @Override

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsuppoertedActions={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        //disable methods for put post delete
        config.getExposureConfiguration().forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsuppoertedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsuppoertedActions));

        //disable methods for put post delete
        config.getExposureConfiguration().forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsuppoertedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsuppoertedActions));

        //call internal helper method to expose ID's
        exposeIds(config);

    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids
        //-get alist of entity classes from entity manager
        Set<EntityType<?>> entities=entityManager.getMetamodel().getEntities();

        //create an array of entity types
    List<Class> entityClasses=new ArrayList<>();
    //get the entity types for the entities
        for(EntityType tempEntityType:entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
    //expose the entity id's for the array of entity /domain types
        Class[] domainTypes=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
