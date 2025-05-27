import React from "react";
import PropertyCard from "./PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/UI/carousel";

const PropertyListView = ({ properties }) => {
  return (
    <Carousel
      className="w-full mx-6"
      opts={{
        align: "start",
        loop: true,
      }}>
      <CarouselContent className="-ml-4">
        {properties && properties.map((property) => {
          return (
            <CarouselItem key={property._id.toString()} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <PropertyCard
                id={property._id}
                propName={property.propertyName}
                propImage={property.image}
                propLocation={property.location}
                propAttributes={property.attributes}
                propOwnerPhone={property.seller.phone}
                // propOwnerWhatsApp={property.addedBy.whatsapp}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PropertyListView;
