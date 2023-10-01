export default function PlaceImg({place,className,inedx=0}){
    if(!place?.images.length){
        return '';
    }
    if(!className){
        className = 'object-cover'
    }
    return (
        <img className={className}src={'http://localhost:6969/uploads/' + place.images[0]} />
    )

}