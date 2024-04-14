export enum AttributeType {
    String = 'stringOptions',
    Boolean = 'numberOptions',
    Number = 'numberOptions',
    Date = 'stringOptions'
}

export enum JoinAttributeRelations {
    All = 'all',
    Options = 'attribute.options',
    Rule = 'attribute.rule'
}

export enum JoinAttributeAlias {
    All = 'all',
    Options = 'options',
    Rule = 'rule'
}

export enum AttributeProperties {
    All = 'ALL',
    Id = 'attribute.id',
    Name = 'attribute.name',
    Code = 'attribute.code',
    IsActive = 'attribute.isActive',
    IsRequired = 'attribute.isRequired',
    Parent = 'attribute.parent',
    Description = 'attribute.description',
    DataType = 'attribute.dataType',
    IsArray = 'attribute.isArray'
}
