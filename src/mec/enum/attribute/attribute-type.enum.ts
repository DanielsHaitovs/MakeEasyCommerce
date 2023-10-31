export enum AttributeType {
    Config = 'Config',
    String = 'String',
    Boolean = 'Boolean',
    Number = 'Number',
    JSON = 'JSON',
    Date = 'Date',
}

export enum JoinAttributeRelations {
    All = 'all',
    Options = 'attribute.options',
    Rule = 'attribute.rule',
}

export enum JoinAttributeAlias {
    All = 'all',
    Options = 'options',
    Rule = 'rule',
}

export enum AttributeSelect {
    All = 'ALL',
    Id = 'attribute.id',
    Name = 'attribute.name',
    Code = 'attribute.code',
    IsActive = 'attribute.isActive',
    IsRequired = 'attribute.isRequired',
    Parent = 'attribute.parent',
    Description = 'attribute.details.description',
    DataType = 'attribute.details.dataType',
    IsArray = 'attribute.details.isArray',
}
