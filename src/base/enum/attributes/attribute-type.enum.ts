export enum AttributeType {
    Config = 'Config',
    String = 'String',
    Boolean = 'Boolean',
    Number = 'Number',
    JSON = 'JSON',
    Date = 'Date',
}

export enum AttributeRuleType {
    Front = 'front',
    Back = 'back',
}

export enum AttributeRuleFilter {
    All = 'all',
    Id = 'id',
    Front = 'front',
    Back = 'back',
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
