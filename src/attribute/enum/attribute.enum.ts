export enum AttributeType {
    String = 'String',
    Boolean = 'Boolean',
    Number = 'Number',
    JSON = 'JSON',
    Date = 'Date',
    Config = 'Config'
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
