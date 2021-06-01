export interface IMapper {
    toDomain: (item: any) => any;
    toDalEntity: (item: any) => any;
}
