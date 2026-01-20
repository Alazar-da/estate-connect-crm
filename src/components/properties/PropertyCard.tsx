import { Property } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Heart, Share2,Building,Building2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors = {
  active: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  sold: 'bg-primary/10 text-primary border-primary/20',
  off_market: 'bg-muted text-muted-foreground border-muted',
};

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  return (
    <div 
      className="bg-card rounded-2xl overflow-hidden shadow-md card-hover cursor-pointer animate-slide-up group"
      onClick={() => onSelect?.(property)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <Badge 
          variant="outline" 
          className={cn(
            "absolute top-3 left-3 capitalize backdrop-blur-sm",
            statusColors[property.status]
          )}
        >
          {property.status.replace('_', ' ')}
        </Badge>

        <div className="absolute top-3 right-3 flex gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4 text-white" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-4 h-4 text-white" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-2xl font-bold text-white">
            ${property.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-accent transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-sm">
            <Building className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-muted-foreground">Rooms</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Building2Icon className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-muted-foreground">Floors</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.sqft.toLocaleString()}</span>
            <span className="text-muted-foreground">sqft</span>
          </div>
        </div>

        {property.mlsNumber && (
          <p className="text-xs text-muted-foreground mt-3">
            MLS# {property.mlsNumber}
          </p>
        )}
      </div>
    </div>
  );
}
