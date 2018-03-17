<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Ulid\Ulid;

/**
 * Guest
 *
 * @ORM\Table(name="guest")
 * @ORM\Entity
 */
class Guest
{
    /**
     * @var integer
     *
     * @ORM\Column(name="guest_id", type="string", length=26)
     * @ORM\Id
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="RSVP")
     * @ORM\JoinColumn(name="rsvp_id", referencedColumnName="rsvp_id")
     */
    private $rsvp;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     */
    private $first_name;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     */
    private $last_name;

    public function __construct(array $params = [])
    {
        // @TODO Add a Ulid method!
        $this->id = (string) Ulid::generate();
    }

    /**
     * Get id
     *
     * @return string
     */
    public function getId() : string
    {
        return $this->id;
    }

    /**
     * Set rsvp
     *
     * @param RSVP|null $rsvp
     * @return Guest
     */
    public function setRsvp(?RSVP $rsvp) : self
    {
        $this->rsvp = $rsvp;

        return $this;
    }

    /**
     * Get rsvp
     *
     * @return RSVP
     */
    public function getRsvp() : RSVP
    {
        return $this->rsvp;
    }

    /**
     * Set first_name
     *
     * @Groups("create")
     *
     * @param string $first_name
     * @return Guest
     */
    public function setFirstName(string $first_name) : self
    {
        $this->first_name = $first_name;

        return $this;
    }

    /**
     * Get first_name
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getFirstName() : string
    {
        return $this->first_name;
    }

    /**
     * Set last_name
     *
     * @Groups("create")
     *
     * @param string $last_name
     * @return Guest
     */
    public function setLastName(string $last_name) : self
    {
        $this->last_name = $last_name;

        return $this;
    }

    /**
     * Get last_name
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getLastName() : string
    {
        return $this->last_name;
    }
}
