<?php

namespace App\Operation;

use ApiPlatform\Core\Operation\PathSegmentNameGeneratorInterface;

/**
 * Make provided generator singular instead of plural.
 *
 * @TODO  Make this a library.
 */
class SingularSegmentNameGenerator implements PathSegmentNameGeneratorInterface
{

    public function __construct(PathSegmentNameGeneratorInterface $generator)
    {
        $this->generator = $generator;
    }

    /**
     * {@inheritdoc}
     */
    public function getSegmentName(string $name, bool $collection = true) : string
    {
        return $this->generator->getSegmentName($name, false);
    }
}
